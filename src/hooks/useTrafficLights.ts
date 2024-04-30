import { useState, useEffect } from "react";
import { LightState } from "../types";

const lightDurations: Record<LightState["color"], number> = {
    green: 5000,
    yellow: 1000,
    red: 2000,
    redYellow: 2000,
};

const transitionTime = 1000;
const initialMainRoadLight: LightState = { color: "green", duration: 2000 };
const initialSideRoadLight: LightState = { color: "red", duration: 2000 };

export const useTrafficLights = () => {
    const [mainRoadLight, setMainRoadLight] =
        useState<LightState>(initialMainRoadLight);
    const [sideRoadLight, setSideRoadLight] =
        useState<LightState>(initialSideRoadLight);

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
    }, [mainRoadLight, sideRoadLight]);
    return { mainRoadLight, sideRoadLight };
}