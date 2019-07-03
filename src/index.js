import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
    const [ repoUrl, setRepoUrl ] = useState('');
    const [ repoData, setRepoData] = useState({});

    const fetchRepoData = () => {
        fetch(
            `/.netlify/functions/getPackagesFromGitRepo`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({repo: repoUrl})
            }
        )
        .then(res => res.json())
        .then(res => setRepoData(res));
    }

    return (
        <div className="App">
            <h1>npm package check</h1>
            <h2>Enter a github repo below</h2>
            <input
                value={repoUrl}
                placeholder="https://github.com/username/repo"
                onChange={evt => setRepoUrl(evt.target.value)}
            />
            <button
                onClick={() => fetchRepoData()}
            >
                Get Data
            </button>
            <p>
                {
                    JSON.stringify(repoData, null, 4)
                }
            </p>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

// const [pkgName, setPkgName] = useState('');
// const [fetchData, setFetchData] = useState(false);
// const [reposnse, setReposnse] = useState({
//     description: '',
//     reference: '',
//     vulnerabilities: []
// });
//
// useEffect(() => {
//     if (fetchData) {
//         fetch(`/.netlify/functions/checkPackage?pkg=${pkgName}`, {headers: {"Content-Type": "application/json"}})
//             .then(res => res.json())
//             .then(res => setReposnse(res[0]));
//         setFetchData(false);
//     }
//
// }, [fetchData]);
