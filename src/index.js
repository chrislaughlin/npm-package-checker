import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
    const [pkgName, setPkgName] = useState('');
    const [fetchData, setFetchData] = useState(false);
    const [reposnse, setReposnse] = useState({
        description: '',
        reference: '',
        vulnerabilities: []
    });

    useEffect(() => {
        if (fetchData) {
            fetch(`/.netlify/functions/hello?pkg=${pkgName}`, {headers: {"Content-Type": "application/json"}})
                .then(res => res.json())
                .then(res => setReposnse(res[0]));
            setFetchData(false);
        }

    }, [fetchData]);

    return (
        <div className="App">
            <h1>npm package check</h1>
            <h2>Enter a package name below</h2>
            <input
                value={pkgName}
                onChange={evt => setPkgName(evt.target.value)}
            />
            <button
                onClick={() => setFetchData(true)}
            >
                Get Data
            </button>
            <p><b>description</b>
                {reposnse.description}
            </p>
            <p><b>reference</b>
                {reposnse.reference}
            </p>
            <p><b>vulnerabilities</b>
                {reposnse.vulnerabilities.length}
            </p>
            {
                reposnse.vulnerabilities.length &&
                    <p>
                        <ul>
                            {reposnse.vulnerabilities.map(vuln => {
                                <li>{vuln.title}</li>
                            })}
                        </ul>
                    </p>
            }
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
