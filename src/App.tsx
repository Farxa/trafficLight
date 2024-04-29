import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { TrafficLight } from "./components/TrafficLight";
import { PedestrianButton } from "./components/PedestrianButton";
import { Root, Row, Container } from "./components/Layout";

function App() {
  const [mainRoadLight, setMainRoadLight] = useState<
    "green" | "yellow" | "red"
  >("green");
  const [sideRoadLight, setSideRoadLight] = useState<
    "green" | "yellow" | "red"
  >("red");
  const [pedestrianLight, setPedestrianLight] = useState<"red" | "green">(
    "red"
  );
  const [pedestrianRequest, setPedestrianRequest] = useState(false);
  const [pedestrianBlinking, setPedestrianBlinking] = useState(false);
  const [mainRoadRedYellowFlashing, setMainRoadRedYellowFlashing] =
    useState(false);
  const [sideRoadRedYellowFlashing, setSideRoadRedYellowFlashing] =
    useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (mainRoadLight === "green") {
        setMainRoadLight("yellow");
        setTimeout(() => {
          setMainRoadLight("red");
          // setSideRoadLight("red");
          // setMainRoadRedYellowFlashing(true);
          // setSideRoadRedYellowFlashing(true);
          // setTimeout(() => {
          // setMainRoadRedYellowFlashing(false);
          // setSideRoadRedYellowFlashing(false);
          if (!pedestrianRequest) {
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
          }
          // }, 2000);
        }, 1000);
      }
    }, 8000);

    return () => {
      clearInterval(timer);
    };
  }, [mainRoadLight, pedestrianRequest]);

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
