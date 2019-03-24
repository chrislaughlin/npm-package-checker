import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [reposnse, setReposnse] = useState({
      description: '',
      reference: '',
      vulnerabilities: []
  });

  useEffect(() => {
    fetch("/.netlify/functions/hello", {headers: { "Content-Type": "application/json" }})
      .then(res => res.json())
      .then(res => setReposnse(res[0]));
  }, []);

  return (
    <div className="App">
      <h1>npm package check</h1>
      <h2>Start editing to see some magic happen!</h2>
        <p><b>description</b>
            {reposnse.description}
        </p>
        <p><b>reference</b>
            {reposnse.reference}
        </p>
        <p><b>vulnerabilities</b>
            {reposnse.vulnerabilities.length}
        </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
