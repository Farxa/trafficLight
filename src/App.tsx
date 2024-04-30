import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { useTrafficLights } from "./hooks/useTrafficLights";
import { usePedestrianLight } from "./hooks/usePedestrianLight";
import { TrafficLight } from "./components/TrafficLight";
import { PedestrianButton } from "./components/PedestrianButton";
import { Root, Row, Container } from "./components/Layout";

function App() {
  const { mainRoadLight, sideRoadLight } = useTrafficLights();
  const { pedestrianLight, pedestrianBlinking, handlePedestrianRequest } =
    usePedestrianLight();
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
