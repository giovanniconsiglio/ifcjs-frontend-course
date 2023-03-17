import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Building } from './../../types';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Events } from '../../middleware/event-handler';
import { getApp } from 'firebase/app';

export const databaseHandler = {
    login: () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
    },

    logout: () => {
        const auth = getAuth()
        signOut(auth)
    },

    deleteBuilding: async (building: Building, events: Events) => {
        const id = building.uid
        const dbInstance = getFirestore(getApp())
        await deleteDoc(doc(dbInstance, "buildings", id))
        events.trigger({type: "CLOSE_BUILDING"})
    },

    updateBuilding: async (building: Building) => {
        const dbInstance = getFirestore(getApp()) 
        await updateDoc(doc(dbInstance, "buildings", building.uid), {
            ...building,
        })
    }
}