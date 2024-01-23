import logo from "./logo.svg";
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect } from "react";

const client = new W3CWebSocket("ws://localhost:8000");

function App() {
  useEffect(() => {
    client.onopen = () => {
      //that mean our code is able to connect to the server
      console.log("WebSocket Client Connected");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Oussama</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
