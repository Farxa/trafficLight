import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { useTrafficLights } from "./hooks/useTrafficLights";
import { usePedestrianLight } from "./hooks/usePedestrianLight";
import { Header } from "./components/Header";
import { TrafficLight } from "./components/TrafficLight";
import { PedestrianButton } from "./components/PedestrianButton";
import {
  CrossRoadContainer,
  TrafficLightRow,
  TrafficLightContainer,
  PedestrianIconContainer,
} from "./components/Layout";

function App() {
  const { mainRoadLight, sideRoadLight } = useTrafficLights();
  const { pedestrianLight, pedestrianBlinking, handlePedestrianRequest } =
    usePedestrianLight();
  return (
    <>
      <Header />
      <CrossRoadContainer>
        <TrafficLightRow>
          <TrafficLightContainer>
            <PedestrianButton
              variant="contained"
              color="primary"
              onClick={handlePedestrianRequest}
            >
              Start
            </PedestrianButton>
            <TrafficLight
              lights={mainRoadLight}
              orientation="horizontal"
              position="bottom-right"
            />
          </TrafficLightContainer>
          <TrafficLightContainer>
            <PedestrianIconContainer>
              <TrafficLight
                isPedestrianLight={true}
                lights={pedestrianLight}
                blinking={pedestrianBlinking}
              />
              <FontAwesomeIcon icon={faPersonWalking} color="black" size="3x" />
            </PedestrianIconContainer>
          </TrafficLightContainer>
        </TrafficLightRow>
        <TrafficLightRow>
          <TrafficLightContainer />
          <TrafficLightContainer>
            <TrafficLight lights={sideRoadLight} position="top-left" />
          </TrafficLightContainer>
        </TrafficLightRow>
      </CrossRoadContainer>
    </>
  );
}

export default App;
