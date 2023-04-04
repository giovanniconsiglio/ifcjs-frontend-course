import { Events } from "./../../middleware/event-handler";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { Building, Model } from "./../../types";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { buildingHandler } from "../building/building-handler";

export const databaseHandler = {
    login: () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider);
    },

    logout: () => {
        const auth = getAuth();
        signOut(auth);
    },

    deleteBuilding: async (building: Building, events: Events) => {
        const id = building.uid;
        const app = getApp()
        const dbInstance = getFirestore(app);
        await deleteDoc(doc(dbInstance, "buildings", id))
        const storageInstance = getStorage(app)
        for(const model of building.models) {
            const fileRef = ref(storageInstance, model.id)
            await deleteObject(fileRef)
            await buildingHandler.deleteModel(model.id)
        }
        events.trigger({ type: "CLOSE_BUILDING" });
    },

    updateBuilding: async (building: Building) => {
        const dbInstance = getFirestore(getApp());
        await updateDoc(doc(dbInstance, "buildings", building.uid), {
            ...building,
        });
    },

    uploadModel: async (
        model: Model,
        file: File,
        building: Building,
        events: Events
    ) => {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        await uploadBytes(fileRef, file);
        events.trigger({ type: "UPDATE_BUILDING", payload: building });
    },

    deleteModel: async (model: Model, building: Building, events: Events) => {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        console.log(fileRef)
        await deleteObject(fileRef);
        console.log("delete")
        events.trigger({ type: "UPDATE_BUILDING", payload: building });
       
    },
};
