import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [reposnse, setReposnse] = useState({});

  useEffect(() => {
    fetch("/.netlify/functions/hello", {headers: { "Content-Type": "application/json" }})
      .then(res => res.json())
      .then(res => setReposnse(res));
  });

  return (
    <div className="App">
      <h1>npm package check</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h2> RES: {JSON.stringify(reposnse)} </h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
