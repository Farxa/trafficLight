import { useEffect, useContext } from "react";
import { StateContext } from "../StateContext";



export const useTrafficLights = () => {
    const state = useContext(StateContext);

    if (!state) {
        throw new Error("useTrafficLights must be used within a StateProvider");
    }

    const {
        mainRoadLight,
        setMainRoadLight,
        sideRoadLight,
        setSideRoadLight,
        lightDurations,
        transitionTime,
    } = state;

    useEffect(() => {
        const switchLights = () => {
            if (mainRoadLight.color === "green") {
                setMainRoadLight({ color: "yellow", duration: lightDurations.yellow });
                setTimeout(() => {
                    setMainRoadLight({ color: "red", duration: lightDurations.red });
                    setTimeout(() => {
                        setSideRoadLight({
                            color: "redYellow",
                            duration: lightDurations.redYellow,
                        });
                        setTimeout(() => {
                            setSideRoadLight({
                                color: "green",
                                duration: lightDurations.green,
                            });
                        }, lightDurations.redYellow + transitionTime);
                    }, lightDurations.red + transitionTime);
                }, lightDurations.yellow + transitionTime);
            } else if (sideRoadLight.color === "green") {
                setTimeout(() => {
                    setSideRoadLight({ color: "yellow", duration: lightDurations.yellow });
                    setTimeout(() => {
                        setSideRoadLight({ color: "red", duration: lightDurations.red });
                        setTimeout(() => {
                            setMainRoadLight({
                                color: "redYellow",
                                duration: lightDurations.redYellow,
                            });
                            setTimeout(() => {
                                setMainRoadLight({
                                    color: "green",
                                    duration: lightDurations.green,
                                });
                            }, lightDurations.redYellow + transitionTime);
                        }, lightDurations.red + transitionTime);
                    }, lightDurations.yellow + transitionTime);
                }, lightDurations.green);
            }
        };

        const timer = setTimeout(switchLights, mainRoadLight.duration);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainRoadLight, sideRoadLight]);
    return { mainRoadLight, sideRoadLight };
}