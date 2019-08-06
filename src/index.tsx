import React, {useState } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

import "./styles.css";

//Types
import { VulnerablePackage } from './types/vulnerablePackage';

//Components
import RepoEntry from './components/repoEntry/repoEntry';
import Spinner from './components/spinner/spinner';
import VulnDetails from './components/vulnDetailsModal/vulnDetailsModal';
import NoVulnsMessage from './components/noVulnsMessage/noVulnsMessage';
import RepoCards from './components/repoCards/repoCards';


const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const DEFAULT_ERROR_MESSAGE = 'Unknown error, I probably half assed the code';

type Pky =  {
    pkg: string
    pkgDescription: string
    vulns: Array<any>
}

function App() {
    const [ repoUrl, setRepoUrl ] = useState('');
    const [ repoData, setRepoData] = useState<Array<VulnerablePackage> | undefined>(undefined);
    const [ isFetchingData, setIsFetchingData] = useState(false);
    const [ error, setError ] = useState({
        showError: false,
        message: 'Unknown error, I probably half assed the code'
    })
    const [ selectedVuln, setSelectedVuln ] = useState<Pky | undefined>(undefined);

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
                return;
            }

            setRepoData(res)
            setError({
                showError: false,
                message: DEFAULT_ERROR_MESSAGE
            })

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
                <Spinner showSpinner={isFetchingData}/>
                <NoVulnsMessage
                    repoData={repoData}
                />
                {
                    !error.showError &&
                    repoData &&
                    <RepoCards
                        repoData={repoData}
                        setSelectedVuln={setSelectedVuln}
                    />
                }
            </Cards>
            {
                selectedVuln &&
                <VulnDetails
                    onClose={() => setSelectedVuln(undefined)}
                    selectedVuln={selectedVuln}
                />
            }

        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
