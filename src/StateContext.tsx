import React, { createContext, useState } from "react";
import { LightState } from "./types";

interface StateContextType {
  pedestrianLight: LightState;
  setPedestrianLight: React.Dispatch<React.SetStateAction<LightState>>;
  pedestrianRequest: boolean;
  setPedestrianRequest: React.Dispatch<React.SetStateAction<boolean>>;
  pedestrianBlinking: boolean;
  switchingLights: boolean;
  setSwitchingLights: React.Dispatch<React.SetStateAction<boolean>>;
  setPedestrianBlinking: React.Dispatch<React.SetStateAction<boolean>>;
  mainRoadLight: LightState;
  setMainRoadLight: React.Dispatch<React.SetStateAction<LightState>>;
  sideRoadLight: LightState;
  setSideRoadLight: React.Dispatch<React.SetStateAction<LightState>>;
  lightDurations: Record<LightState["color"], number>;
  transitionTime: number;
  blinkingDelay: number;
}

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [pedestrianLight, setPedestrianLight] = useState<LightState>({
    color: "red",
    duration: 0,
  });
  const [pedestrianRequest, setPedestrianRequest] = useState(false);
  const [pedestrianBlinking, setPedestrianBlinking] = useState(false);
  const [switchingLights, setSwitchingLights] = useState(false);
  const [mainRoadLight, setMainRoadLight] = useState<LightState>({
    color: "green",
    duration: 2000,
  });
  const [sideRoadLight, setSideRoadLight] = useState<LightState>({
    color: "red",
    duration: 2000,
  });

  const lightDurations: Record<LightState["color"], number> = {
    green: 5000,
    yellow: 1000,
    red: 2000,
    redYellow: 2000,
  };

  const transitionTime = 1000;
  const blinkingDelay = 1000;

  return (
    <StateContext.Provider
      value={{
        pedestrianLight,
        setPedestrianLight,
        pedestrianRequest,
        setPedestrianRequest,
        pedestrianBlinking,
        setPedestrianBlinking,
        mainRoadLight,
        setMainRoadLight,
        sideRoadLight,
        setSideRoadLight,
        lightDurations,
        transitionTime,
        blinkingDelay,
        switchingLights,
        setSwitchingLights,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
