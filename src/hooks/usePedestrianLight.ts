/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { StateContext } from "../StateContext";



export const usePedestrianLight = () => {
    const state = useContext(StateContext);

    if (!state) {
        throw new Error("usePedestrianLight must be used within a StateProvider");
    }

    const {
        mainRoadLight,
        sideRoadLight,
        pedestrianLight,
        pedestrianRequest,
        pedestrianBlinking,
        setPedestrianLight,
        setPedestrianRequest,
        setPedestrianBlinking,
    } = state;

    useEffect(() => {
        if (
            pedestrianRequest &&
            mainRoadLight.color === "red" &&
            sideRoadLight.color === "red"
        ) {
            setPedestrianBlinking(false);
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
        }
    }, [pedestrianRequest, pedestrianLight]);

    const handlePedestrianRequest = () => {
        setPedestrianRequest(true);
    };

    return { pedestrianLight, pedestrianBlinking, handlePedestrianRequest };
};