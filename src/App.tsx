import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "./assets/crossroad.png";

const Root = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  margin: "25px 0 0 0;",
  padding: 0,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
});

const Row = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "50%",
  width: "100%",
});

const Container = styled(Box)({
  width: "50%",
  display: "flex",
  position: "relative",
});

const TrafficLight = styled(Box)({
  borderRadius: 10,
  height: "fit-content",
  backgroundColor: "black",
  padding: "3px 8px",
});

const LightCircle = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: "50%",
  margin: "10px auto",
  "@keyframes blink": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const PedestrianButton = styled(Button)(() => ({
  height: "fit-content",
  width: "fit-content",
  position: "absolute",
  top: 20,
  left: 60,
}));

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
          setTimeout(() => {
            if (!pedestrianRequest) {
              if (sideRoadLight === "red") {
                setSideRoadLight("green");
                setTimeout(() => {
                  setSideRoadLight("yellow");
                  setMainRoadLight("yellow");
                  setTimeout(() => {
                    setSideRoadLight("red");
                    setTimeout(() => {
                      setMainRoadLight("green");
                    }, 5000);
                  }, 1000);
                }, 5000);
              } else if (sideRoadLight === "green") {
                setMainRoadLight("red");
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
      <Box textAlign="center">
        <Typography
          variant="h1"
          gutterBottom
          sx={{ margin: "40px", padding: "10px" }}
        >
          Traffic Lights Demo
        </Typography>
      </Box>
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
              style={{
                display: "flex",
                position: "absolute",
                bottom: 40,
                right: 110,
                gap: "10px",
              }}
            >
              <LightCircle
                style={{
                  backgroundColor:
                    mainRoadLight === "green" ? "green" : "#CCCCCC",
                }}
              />
              <LightCircle
                style={{
                  backgroundColor:
                    mainRoadLight === "yellow" ? "yellow" : "#CCCCCC",
                }}
              />
              <LightCircle
                style={{
                  backgroundColor: mainRoadLight === "red" ? "red" : "#CCCCCC",
                }}
              />
            </TrafficLight>
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
              <TrafficLight>
                <LightCircle
                  style={{
                    backgroundColor:
                      pedestrianLight === "red" ? "red" : "#CCCCCC",
                    animation: pedestrianBlinking
                      ? "blink 0.5s linear infinite"
                      : "none",
                  }}
                />
                <LightCircle
                  style={{
                    backgroundColor:
                      pedestrianLight === "green" ? "green" : "#CCCCCC",
                  }}
                />
              </TrafficLight>
              <FontAwesomeIcon icon={faPersonWalking} color="black" size="3x" />
            </Box>
          </Container>
        </Row>
        <Row>
          <Container />
          <Container>
            <TrafficLight
              style={{
                position: "absolute",
                top: 150,
                left: 110,
              }}
            >
              <LightCircle
                style={{
                  backgroundColor: sideRoadLight === "red" ? "red" : "#CCCCCC",
                }}
              />
              <LightCircle
                style={{
                  backgroundColor:
                    sideRoadLight === "yellow" ? "yellow" : "#CCCCCC",
                }}
              />
              <LightCircle
                style={{
                  backgroundColor:
                    sideRoadLight === "green" ? "green" : "#CCCCCC",
                }}
              />
            </TrafficLight>
          </Container>
        </Row>
      </Root>
    </>
  );
}

export default App;
