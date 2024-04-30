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

  useEffect(() => {
    const lightDurations: Record<LightState["color"], number> = {
      green: 5000,
      yellow: 1000,
      red: 2000,
      redYellow: 2000,
    };

    const transitionTime = 1000;

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
      }
    };

    const timer = setTimeout(switchLights, mainRoadLight.duration);

    return () => {
      clearTimeout(timer);
    };
  }, [mainRoadLight, sideRoadLight]);

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
              redLight={mainRoadLight.color === "red"}
              yellowLight={mainRoadLight.color === "yellow"}
              greenLight={mainRoadLight.color === "green"}
              redYellow={mainRoadLight.color === "redYellow"}
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
                redLight={pedestrianLight.color === "red"}
                greenLight={pedestrianLight.color === "green"}
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
              redLight={sideRoadLight.color === "red"}
              yellowLight={sideRoadLight.color === "yellow"}
              greenLight={sideRoadLight.color === "green"}
              redYellow={sideRoadLight.color === "redYellow"}
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
