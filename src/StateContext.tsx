import React, { createContext, useState } from "react";
import { LightState, LightColor, StateContextType } from "./types";

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

  const [mainRoadLight, setMainRoadLight] = useState<LightState>({
    color: "green",
    duration: 2000,
  });
  const [sideRoadLight, setSideRoadLight] = useState<LightState>({
    color: "red",
    duration: 2000,
  });

  const lightDurations: Record<LightColor, number> = {
    green: 5000,
    yellow: 1000,
    red: 2000,
    redYellow: 2000,
  };

  const transitionTime = 1000;

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
