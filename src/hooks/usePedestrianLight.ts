import { useState, useEffect } from "react";
import { useTrafficLights } from "./useTrafficLights";
import { LightState } from "../types";


const initialPedestrianLight: LightState = { color: "red", duration: 0 };

export const usePedestrianLight = () => {
    const [pedestrianLight, setPedestrianLight] = useState<LightState>(
        initialPedestrianLight
    );
    const [pedestrianRequest, setPedestrianRequest] = useState(false);
    const [pedestrianBlinking, setPedestrianBlinking] = useState(false);

    const { mainRoadLight, sideRoadLight } = useTrafficLights();

    useEffect(() => {
        if (
            pedestrianRequest &&
            mainRoadLight.color === "red" &&
            sideRoadLight.color === "red"
        ) {
            setPedestrianLight({ color: "green", duration: 5000 });
            setTimeout(() => {
                setPedestrianLight({ color: "red", duration: 0 });
                setPedestrianRequest(false);
            }, 5000);
        }
    }, [pedestrianRequest, mainRoadLight, sideRoadLight]);

    useEffect(() => {
        if (pedestrianRequest && pedestrianLight.color === "red") {
            setPedestrianBlinking(true);
        } else {
            setPedestrianBlinking(false);
        }
    }, [pedestrianRequest, pedestrianLight]);

    const handlePedestrianRequest = () => {
        setPedestrianRequest(true);
    };

    return { pedestrianLight, pedestrianBlinking, handlePedestrianRequest };
};