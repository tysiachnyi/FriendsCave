import { useState } from "react";
import { Home } from "./screens/Home";
import { Join } from "./screens/Join";
import { Create } from "./screens/Create";
import "./App.css";

type Screen = "home" | "join" | "create";

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const toHome = () => setScreen("home");

  return (
    <>
      {screen === "home" && <Home onNavigate={(s) => setScreen(s)} />}
      {screen === "join" && (
        <Join
          onBack={toHome}
          onSubmitCode={(c) => console.log("join with code", c)}
        />
      )}
      {screen === "create" && (
        <Create
          onBack={toHome}
          onCreate={(data) => console.log("create cave", data)}
        />
      )}
    </>
  );
}

export default App;
