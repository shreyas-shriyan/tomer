import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");

  const [items, setItems] = useState([""]);

  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setItems([...items, name])}>Add</button>
      <div>
        {items.map((item) => {
          return <div style={{ padding: "10px" }}>{item}</div>;
        })}
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
