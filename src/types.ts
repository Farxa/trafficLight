export type LightColor = "green" | "yellow" | "red" | "redYellow";

export interface LightState {
    color: LightColor;
    duration: number;
}

export interface StateContextType {
    pedestrianLight: LightState;
    setPedestrianLight: React.Dispatch<React.SetStateAction<LightState>>;
    pedestrianRequest: boolean;
    setPedestrianRequest: React.Dispatch<React.SetStateAction<boolean>>;
    pedestrianBlinking: boolean;
    setPedestrianBlinking: React.Dispatch<React.SetStateAction<boolean>>;
    mainRoadLight: LightState;
    setMainRoadLight: React.Dispatch<React.SetStateAction<LightState>>;
    sideRoadLight: LightState;
    setSideRoadLight: React.Dispatch<React.SetStateAction<LightState>>;
    lightDurations: Record<LightColor, number>;
    transitionTime: number;
}