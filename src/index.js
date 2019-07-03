import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import RepoEntry from './comments/repoEntry/repoEntry';

function App() {
    const [ repoUrl, setRepoUrl ] = useState('');
    const [ repoData, setRepoData] = useState({});
    const [ isFetchingData, setIsFetchingData] = useState(false);

    const fetchRepoData = () => {
        setIsFetchingData(true);
        fetch(
            `/.netlify/functions/getPackagesFromGitRepo`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({repo: repoUrl})
            }
        )
        .then(res => res.json())
        .then(res => {
            setRepoData(res)
            setIsFetchingData(false);
        });
    }

    return (
        <div className="App">
            <RepoEntry
                repoUrl={repoUrl}
                setRepoUrl={setRepoUrl}
                fetchRepoData={fetchRepoData}
            />
            <p>
                {
                    isFetchingData ? 'Loading.....' : JSON.stringify(repoData, null, 4)
                }
            </p>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
