export interface GisParameters {
    container: HTMLDivElement;
    accessToken: string;
    zoom: number;
    pitch: number;
    center: [number, number];
    bearing: number;
    buildings: Building[];
}

export interface Building {
    uid: string;
    userID: string;
    lat: number;
    lng: number;
    name: string;
    models: Model[]
}

export interface LngLat {
    lng: number;
    lat: number;
}

export interface Tool {
    name: string;
    icon: any;
    action: (...args: any) => void
}

export interface Model{
    name: string;
    id: string;
}