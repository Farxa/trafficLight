import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { useTrafficLights } from "./hooks/useTrafficLights";
import { usePedestrianLight } from "./hooks/usePedestrianLight";
import { TrafficLight } from "./components/TrafficLight";
import { PedestrianButton } from "./components/PedestrianButton";
import { Root, Row, Container } from "./components/Layout";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  const { mainRoadLight, sideRoadLight } = useTrafficLights();
  const { pedestrianLight, pedestrianBlinking, handlePedestrianRequest } =
    usePedestrianLight();
  return (
    <>
      <Typography
        variant="h1"
        gutterBottom
        sx={{
          margin: theme.spacing(5),
          padding: theme.spacing(1),
          textAlign: "center",
        }}
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
              sx={{
                position: "absolute",
                top: theme.spacing(2),
                left: theme.spacing(7),
              }}
            >
              Start
            </PedestrianButton>
            <TrafficLight
              redLight={mainRoadLight.color === "red"}
              yellowLight={mainRoadLight.color === "yellow"}
              greenLight={mainRoadLight.color === "green"}
              redYellow={mainRoadLight.color === "redYellow"}
              orientation="horizontal"
              sx={{
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
              sx={{
                position: "absolute",
                bottom: theme.spacing(1),
                left: "50%",
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1),
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
              sx={{
                position: "absolute",
                top: theme.spacing(19),
                left: theme.spacing(14),
              }}
            />
          </Container>
        </Row>
      </Root>
    </>
  );
}

export default App;
