export const ActionList =[
    "LOGIN",
    "LOGOUT",
    "UPDATE_USER",
    "START_MAP",
    "REMOVE_MAP",
    "ADD_BUILDING",
    "OPEN_BUILDING",
    "CLOSE_BUILDING",
    "UPDATE_BUILDING",
    "DELETE_BUILDING",
    "UPLOAD_BUILDING",
    "UPLOAD_MODEL",
    "DELETE_MODEL",
    "START_BUILDING",
    "CLOSE_BUILDING"
] as const

export type ActionType = typeof ActionList[number]

export interface Action {
    type: ActionType;
    payload?: any;
}
