import { BuildingDatabase } from "./building-database";
import * as OBC from "openbim-components";
import { Building } from "../../types";
import * as THREE from "three";
import { downloadZip } from "client-zip";
import { unzip } from "unzipit";

export class BuildingScene {
    database = new BuildingDatabase();
    
    private components: OBC.Components;
    private fragments: OBC.Fragments;
    private sceneEvents: { name: any; action: any }[] = [];

    constructor(container: HTMLDivElement, building: Building) {
        this.components = new OBC.Components();

        const sceneComponent = new OBC.SimpleScene(this.components);
        const scene = sceneComponent.get();
        scene.background = null;

        const directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set(5, 10, 3);
        directionalLight.intensity = 0.5;
        scene.add(directionalLight);

        const ambientLigth = new THREE.AmbientLight();
        ambientLigth.intensity = 0.5;
        scene.add(ambientLigth);

        this.components.scene = sceneComponent;
        this.components.renderer = new OBC.SimpleRenderer(
            this.components,
            container
        );
        this.components.camera = new OBC.SimpleCamera(this.components);

        this.components.init();

        const grid = new OBC.SimpleGrid(this.components);
        this.components.tools.add(grid);

        this.fragments = new OBC.Fragments(this.components);
        // this.fragments.culler.enabled = false;
        this.loadAllModels(building);

        this.setupEvents();
    }

    dispose() {
        this.toggleEvents(false);
        this.components.dispose();
        (this.components as any) = null;
        (this.fragments as any) = null;
    }

    private setupEvents() {
        this.sceneEvents = [
            { name: "mouseup", action: this.updateCulling },
            { name: "wheel", action: this.updateCulling },
        ];
        this.toggleEvents(true);
    }

    private toggleEvents(active: boolean) {
        for (const event of this.sceneEvents) {
            if (active) {
                window.addEventListener(event.name, event.action);
            } else {
                window.removeEventListener(event.name, event.action);
            }
        }
    }

    private updateCulling = () => {
        this.fragments.culler.needsUpdate = true;
    };

    async convertIfcToFragments(ifc: File) {
        let fragments = new OBC.Fragments(this.components);
        fragments.ifcLoader.settings.optionalCategories.length = 0;
        fragments.ifcLoader.settings.wasm = {
            path: "../../",
            absolute: false,
        };
        fragments.ifcLoader.settings.webIfc = {
            COORDINATE_TO_ORIGIN: true,
            USE_FAST_BOOLS: true,
        };

        const url = URL.createObjectURL(ifc) as any;
        const model = await fragments.ifcLoader.load(url);
        const file = await this.serializeFragments(model);

        fragments.dispose();
        (fragments as any) = null;

        return file as File;
    }
    private async serializeFragments(model: OBC.FragmentGroup) {
        const files = [];
        for (const frag of model.fragments) {
            const file = await frag.export();
            files.push(file.geometry, file.data);
        }

        files.push(
            new File([JSON.stringify(model.properties)], "properties.json")
        );
        files.push(
            new File(
                [JSON.stringify(model.levelRelationships)],
                "levels-relationship.json"
            )
        );
        files.push(
            new File([JSON.stringify(model.itemTypes)], "model-types.json")
        );
        files.push(
            new File([JSON.stringify(model.allTypes)], "all-types.json")
        );
        files.push(
            new File(
                [JSON.stringify(model.floorsProperties)],
                "levels-properties.json"
            )
        );
        files.push(
            new File(
                [JSON.stringify(model.coordinationMatrix)],
                "coordination-matrix.json"
            )
        );
        files.push(
            new File(
                [JSON.stringify(model.expressIDFragmentIDMap)],
                "express-fragment-map.json"
            )
        );

        return downloadZip(files).blob();
    }

    private async loadAllModels(building: Building) {
        const modelsURLs = await this.database.getModels(building);
        for (const url of modelsURLs) {
            const { entries } = await unzip(url);
            const fileNames = Object.keys(entries);

            for (let i = 0; i < fileNames.length; i++) {
                const name = fileNames[i];
                if (!name.includes(".glb")) continue;

                const geometryName = fileNames[i];
                const geometry = await entries[geometryName].blob();
                const geometryURL = URL.createObjectURL(geometry);

                const dataName =
                    geometryName.substring(0, geometryName.indexOf(".glb")) +
                    ".json";
                const dataBlob = await entries[dataName].blob();

                const dataURL = URL.createObjectURL(dataBlob);

                await this.fragments.load(geometryURL, dataURL);

                this.fragments.culler.needsUpdate = true;
            }
        }
    }
}
