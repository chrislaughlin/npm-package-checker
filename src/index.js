import React, {useState } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

import "./styles.css";

import RepoEntry from './components/repoEntry/repoEntry';
import Card from './components/card/card';
import Spinner from './components/spinner/spinner';
import VulnDetails from './components/vulnDetailsModal/vulnDetailsModal';

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const DEFAULT_ERROR_MESSAGE = 'Unknown error, I probably half assed the code';

function App() {
    const [ repoUrl, setRepoUrl ] = useState('');
    const [ repoData, setRepoData] = useState([]);
    const [ isFetchingData, setIsFetchingData] = useState(false);
    const [ error, setError ] = useState({
        showError: false,
        message: 'Unknown error, I probably half assed the code'
    })
    const [ selectedVuln, setSelectedVuln ] = useState(null);

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
            if (res.error) {
                setError({
                    showError: true,
                    message: res.error || DEFAULT_ERROR_MESSAGE
                })
            } else {
                setRepoData(res)
                setError({
                    showError: false
                })
            }

            setIsFetchingData(false);
        }).catch(() => {
            setError({
                showError: true,
                message: DEFAULT_ERROR_MESSAGE
            })
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
            {
                error.showError && <p>{error.message}</p>
            }
            <Cards>
                {
                    isFetchingData ? <Spinner/> :
                        !error.showError && repoData.map(pkg => {
                            return (
                                <Card
                                    name={pkg.pkg}
                                    desc={pkg.pkgDescription}
                                    count={pkg.vulns.length}
                                    onSelectVuln={setSelectedVuln.bind(this, pkg)}
                                />
                            )
                        })
                }
            </Cards>
            {
                selectedVuln &&
                <VulnDetails
                    onClose={() => setSelectedVuln(null)}
                    selectedVuln={selectedVuln}
                />
            }

        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
