import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { TrafficLight } from "./components/TrafficLight";
import { PedestrianButton } from "./components/PedestrianButton";
import { Root, Row, Container } from "./components/Layout";

interface LightState {
  color: "green" | "yellow" | "red" | "redYellow";
  duration: number;
}

const initialMainRoadLight: LightState = { color: "green", duration: 2000 };
const initialSideRoadLight: LightState = { color: "red", duration: 2000 };
const initialPedestrianLight: LightState = { color: "red", duration: 0 };

function App() {
  const [mainRoadLight, setMainRoadLight] =
    useState<LightState>(initialMainRoadLight);
  const [sideRoadLight, setSideRoadLight] =
    useState<LightState>(initialSideRoadLight);
  const [pedestrianLight, setPedestrianLight] = useState<LightState>(
    initialPedestrianLight
  );
  const [pedestrianRequest, setPedestrianRequest] = useState(false);
  const [pedestrianBlinking, setPedestrianBlinking] = useState(false);
  /**
  1. The main road light is set to 'green' the side road to 'red' and the pedestrian crossing to 'red' at initial state.

The following conditions must always be met: 

The traffic light (main or side road lights) changes from yellow to red, and from red, simultaneously flashing yellow, to green. like this: 
- green 5s -> yellow 1s -> red 2s
- red 2s -> red-yellow 2s -> green (transition time represented by -> is 1s)
- if main road light is green, side road light cannot be green. if side road light is green, main road light cannot be green. if sideroad light is green or yellow, Pedestrians light cannot be green.
- for Pedestrians light we always need pedestrianRequest to be true, otherwise this light stays red. once handlePedestrianRequest is clicked, the pedestrian light blinks (setPedestrianRequest(true)) until it becomes green, Green phase lasts for 5 seconds.

2. initially, if no pedestrianRequest happen and the main road light is green: The side road light gets a 1s red-yellow then a 5-second green light and the main road light gets and 1s yellow then a 2s red
   */

  useEffect(() => {
    const lightDurations: Record<LightState["color"], number> = {
      green: 5000,
      yellow: 1000,
      red: 2000,
      redYellow: 2000,
    };

    const transitionTime = 1000;

    const switchLights = () => {
      if (!pedestrianRequest) {
        if (mainRoadLight.color === "green") {
          setMainRoadLight({
            color: "yellow",
            duration: lightDurations.yellow,
          });
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
          }, transitionTime);
          setTimeout(() => {
            setMainRoadLight({ color: "red", duration: lightDurations.red });
          }, lightDurations.yellow + transitionTime);
        } else if (sideRoadLight.color === "green") {
          setSideRoadLight({
            color: "yellow",
            duration: lightDurations.yellow,
          });
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
          }, transitionTime);
          setTimeout(() => {
            setSideRoadLight({ color: "red", duration: lightDurations.red });
          }, lightDurations.yellow + transitionTime);
        }
      }
    };

    const timer = setTimeout(switchLights, mainRoadLight.duration);

    return () => {
      clearTimeout(timer);
    };
  }, [mainRoadLight, sideRoadLight, pedestrianRequest]);

  useEffect(() => {
    if (
      pedestrianRequest &&
      mainRoadLight === "red" &&
      sideRoadLight === "red"
    ) {
      setPedestrianLight("green");
      setTimeout(() => {
        setPedestrianLight("red");
        setPedestrianRequest(false);
        setSideRoadLight("green");
        setTimeout(() => {
          setSideRoadLight("yellow");
          setTimeout(() => {
            setSideRoadLight("red");
            setMainRoadLight("yellow");
            setTimeout(() => {
              setMainRoadLight("green");
            }, 1000);
          }, 1000);
        }, 5000);
      }, 5000);
    }
  }, [pedestrianRequest, mainRoadLight, sideRoadLight]);

  useEffect(() => {
    if (pedestrianRequest && pedestrianLight === "red") {
      setPedestrianBlinking(true);
    } else {
      setPedestrianBlinking(false);
    }
  }, [pedestrianRequest, pedestrianLight]);

  const handlePedestrianRequest = () => {
    setPedestrianRequest(true);
  };

  return (
    <>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ margin: "40px", padding: "10px", textAlign: "center" }}
      >
        Traffic Lights Demo
      </Typography>
      <Root>
        <Row>
          <Container>
            <PedestrianButton
              variant="contained"
              color="primary"
              onClick={handlePedestrianRequest}
            >
              Start
            </PedestrianButton>
            <TrafficLight
              redLight={mainRoadLight === "red" && !mainRoadRedYellowFlashing}
              yellowLight={
                mainRoadLight === "yellow" && !mainRoadRedYellowFlashing
              }
              greenLight={mainRoadLight === "green"}
              redYellow={mainRoadRedYellowFlashing}
              orientation="horizontal"
              style={{
                display: "flex",
                position: "absolute",
                bottom: 40,
                right: 110,
                gap: "10px",
              }}
            />
          </Container>
          <Container>
            <Box
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TrafficLight
                redLight={pedestrianLight === "red"}
                greenLight={pedestrianLight === "green"}
                blinking={pedestrianBlinking}
              />
              <FontAwesomeIcon icon={faPersonWalking} color="black" size="3x" />
            </Box>
          </Container>
        </Row>
        <Row>
          <Container />
          <Container>
            <TrafficLight
              redLight={sideRoadLight === "red" && !sideRoadRedYellowFlashing}
              yellowLight={
                sideRoadLight === "yellow" && !sideRoadRedYellowFlashing
              }
              greenLight={sideRoadLight === "green"}
              redYellow={sideRoadRedYellowFlashing}
              style={{
                position: "absolute",
                top: 150,
                left: 110,
              }}
            />
          </Container>
        </Row>
      </Root>
    </>
  );
}

export default App;
