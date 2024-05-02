import { useEffect, useContext } from "react";
import { StateContext } from "../StateContext";
import { StateContextType } from "../types";

export const useTrafficLights = () => {
    const state = useContext(StateContext);

    const {
        mainRoadLight,
        setMainRoadLight,
        sideRoadLight,
        setSideRoadLight,
        lightDurations,
        transitionTime,
    } = state as StateContextType;

    const switchMainRoadToGreen = () => {
        setMainRoadLight({ color: "green", duration: lightDurations.green });
    };

    const switchMainRoadToRedYellow = () => {
        setMainRoadLight({ color: "redYellow", duration: lightDurations.redYellow });
    };

    const switchMainRoadToRed = () => {
        setMainRoadLight({ color: "red", duration: lightDurations.red });
    };

    const switchSideRoadToGreen = () => {
        setSideRoadLight({ color: "green", duration: lightDurations.green });
    };

    const switchSideRoadToRedYellow = () => {
        setSideRoadLight({ color: "redYellow", duration: lightDurations.redYellow });
    };

    const switchSideRoadToRed = () => {
        setSideRoadLight({ color: "red", duration: lightDurations.red });
    };

    const switchMainRoadToYellow = () => {
        setMainRoadLight({ color: "yellow", duration: lightDurations.yellow });
    };

    const switchSideRoadToYellow = () => {
        setSideRoadLight({ color: "yellow", duration: lightDurations.yellow });
    };


    const switchLights = () => {
        if (mainRoadLight.color === "green") {
            switchMainRoadToYellow();
            setTimeout(() => {
                switchMainRoadToRed();
                setTimeout(() => {
                    switchSideRoadToRedYellow();
                    setTimeout(() => {
                        switchSideRoadToGreen();
                    }, lightDurations.redYellow + transitionTime);
                }, lightDurations.red + transitionTime);
            }, lightDurations.yellow + transitionTime);
        } else if (sideRoadLight.color === "green") {
            setTimeout(() => {
                switchSideRoadToYellow();
                setTimeout(() => {
                    switchSideRoadToRed();
                    setTimeout(() => {
                        switchMainRoadToRedYellow();
                        setTimeout(() => {
                            switchMainRoadToGreen();
                        }, lightDurations.redYellow + transitionTime);
                    }, lightDurations.red + transitionTime);
                }, lightDurations.yellow + transitionTime);
            }, lightDurations.green);
        }
    };
    useEffect(() => {
        const timer = setTimeout(switchLights, mainRoadLight.duration);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainRoadLight, sideRoadLight]);
    return { mainRoadLight, sideRoadLight };
}