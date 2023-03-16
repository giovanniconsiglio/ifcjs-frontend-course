import { MapScene } from './map-scene';

export const mapHandler = {
    viewer: null as MapScene | null,
    
    start(container: HTMLDivElement) {
        if (!this.viewer) {
            console.log("map created");
            this.viewer = new MapScene(container);
            console.log(this.viewer)
        }
    },

    remove() {
        if (this.viewer) {
            console.log("map removed");
            this.viewer.dispose();
            this.viewer = null
        }
    },
};
