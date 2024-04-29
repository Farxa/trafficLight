import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import backgroundImage from "./assets/crossroad.png";

const Root = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  margin: 0,
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
  border: "1px solid black",
  flex: 1,
  display: "flex",
});
const PedestrianButton = styled(Button)(() => ({
  height: "fit-content",
  width: "fit-content",
  top: 100,
  left: 200,
}));
function App() {
  return (
    <>
      <h1>Traffic light demo</h1>
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
          </Container>
          <Container>
          </Container>
        </Row>
        <Row>
          <Container>
            <h3>nothing</h3>
          </Container>
          <Container>
          </Container>
        </Row>
      </Root>
    </>
  );
}

export default App;
