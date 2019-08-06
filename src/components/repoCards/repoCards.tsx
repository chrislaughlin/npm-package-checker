import React, {FunctionComponent, Fragment} from 'react';
import {VulnerablePackage} from "../../types/vulnerablePackage";
import Card from "../card/card";

type Pky =  {
    pkg: string
    pkgDescription: string
    vulns: Array<any>
}

interface Props {
    repoData: Array<VulnerablePackage>
    setSelectedVuln: Function
}


const RepoCards: FunctionComponent<Props> = (props) => {
    const {
        repoData,
        setSelectedVuln
    } = props;

    return (
        <Fragment>
            {
                repoData.map((pkg: Pky) => {
                    return (
                        <Card
                            name={pkg.pkg}
                            desc={pkg.pkgDescription}
                            count={pkg.vulns.length}
                            onSelectVuln={() => setSelectedVuln(pkg)}
                        />
                    );
                })
            }
        </Fragment>
    )
}

export default RepoCards;


