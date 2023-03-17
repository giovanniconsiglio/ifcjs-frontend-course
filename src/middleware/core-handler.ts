// Manage firebase and ifc.js

import { mapHandler } from '../core/map/map-handler';
import { databaseHandler } from '../core/db/db-handler';
import { Action } from './actions';
import { Events } from './event-handler';

export const executeCore = (action: Action, events: Events) => {
    if(action.type === "LOGIN") {
        databaseHandler.login()
    } 
    
    if (action.type === "LOGOUT") {
        databaseHandler.logout()
    }

    if (action.type === "START_MAP") {
        const {user, container} = action.payload
        mapHandler.start(container, user, events)
    }

    if (action.type === "REMOVE_MAP") {
        mapHandler.remove()
    }

    
    if (action.type === "ADD_BUILDING") {
        // mapHandler.remove()
        mapHandler.addBuilding(action.payload)
    }

    if (action.type === "DELETE_BUILDING") {
        databaseHandler.deleteBuilding(action.payload, events)
    }

    if (action.type === "UPDATE_BUILDING") {
        databaseHandler.updateBuilding(action.payload)
    }
}