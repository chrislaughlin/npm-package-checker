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
    const [ selectedVuln, setSelectedVuln ] = useState({
            "pkg": "babel-core",
            "pkgDescription": "A compiler for writing next generation JavaScript",
            "vulns": [
                {
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },
                {
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },
                {
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },
                {
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },{
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },
                {
                    "id": "6688ad9f-7b71-4e9d-8183-38637fbe821c",
                    "title": "CWE-377: Insecure Temporary File",
                    "description": "Creating and using insecure temporary files can leave application and system data vulnerable to attack.",
                    "cvssScore": 0,
                    "cwe": "CWE-377",
                    "reference": "https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"
                },

            ]
        }
    );

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
