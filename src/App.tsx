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

  useEffect(() => {
    const timer = setInterval(() => {
      if (mainRoadLight === "green") {
        setMainRoadLight("yellow");
        !pedestrianRequest && setSideRoadLight("yellow");
        setTimeout(() => {
          setMainRoadLight("red");
          !pedestrianRequest && setSideRoadLight("green");
          setTimeout(() => {
            if (!pedestrianRequest) {
              if (sideRoadLight === "red") {
                setSideRoadLight("green");
                setMainRoadLight("red");
                setTimeout(() => {
                  setSideRoadLight("yellow");
                  setMainRoadLight("yellow");
                  setTimeout(() => {
                    setSideRoadLight("red");
                    setMainRoadLight("green");
                  }, 1000);
                }, 5000);
              }
            }
          }, 2000);
        }, 1000);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [mainRoadLight, pedestrianRequest, sideRoadLight]);

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
        setSideRoadLight("yellow");
        setTimeout(() => {
          setSideRoadLight("green");
        }, 1000);
        setTimeout(() => {
          setSideRoadLight("yellow");
          setTimeout(() => {
            setSideRoadLight("red");
            setMainRoadLight("yellow");
            setTimeout(() => {
              setMainRoadLight("green");
            }, 5000);
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
              redLight={mainRoadLight === "red"}
              yellowLight={mainRoadLight === "yellow"}
              greenLight={mainRoadLight === "green"}
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
              redLight={sideRoadLight === "red"}
              yellowLight={sideRoadLight === "yellow"}
              greenLight={sideRoadLight === "green"}
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
