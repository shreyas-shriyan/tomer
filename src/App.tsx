import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");

  const [items, setItems] = useState([""]);

  const inputRef = useRef<HTMLInputElement>(null);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputRef?.current?.value) {
      setItems([...items, inputRef?.current?.value]);
    }
  };

  //components start
  const ListItem = ({ name }: { name: string }) => {
    return (
      <div className="flex">
        <div className="p-2 text-white bg-orange-500 m-2 rounded-md">
          {name}
        </div>
        <button onClick={() => setItems(items.filter((item) => item !== name))}>
          delete
        </button>
      </div>
    );
  };
  const Input = () => {
    return (
      <div className="max-w-sm">
        <label
          htmlFor="input"
          className="block text-sm font-medium mb-1 dark:text-white"
        >
          Task
        </label>
        <input
          ref={inputRef}
          type="text"
          id="input"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
          placeholder="Enter your task"
        />
      </div>
    );
  };
  //components end

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Input />
        <button
          type="submit"
          className="p-2 text-white bg-orange-500 m-2 rounded-md"
        >
          Add
        </button>
      </form>

      <div>
        {items.map((item) => {
          return <ListItem name={item} />;
        })}
      </div>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
