import { useState } from "react";
import { Home } from "./screens/Home";
import { Join } from "./screens/Join";
import { Create } from "./screens/Create";
import "./App.css";
import { Room } from "./screens/Room";
import { BackButton } from "./components/BackButton";
import { Container } from "./components/Container";

// First run at: 2025-09-05T13:39:24.161Z

type Screen = "home" | "join" | "create" | "room";

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const toHome = () => setScreen("home");

  return (
    <>
      {screen !== "home" && screen !== "room" && (
        <BackButton onClick={toHome} />
      )}
      <Container>
        {screen === "home" && <Home onNavigate={(s) => setScreen(s)} />}
        {screen === "join" && <Join onSubmitCode={() => setScreen("room")} />}
        {screen === "create" && <Create onCreate={() => setScreen("room")} />}
        {screen === "room" && <Room toHome={toHome} />}
      </Container>
    </>
  );
}

export default App;
