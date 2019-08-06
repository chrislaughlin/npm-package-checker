import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import NoVulns from './noVulns.jpg'
import {VulnerablePackage} from "../../types/vulnerablePackage";

const StyledImage = styled.img`
  margin: 10px;
  width: 200px;
`;

type Props = {
    repoData: Array<VulnerablePackage> | undefined
}

const NoVulnsMessage:FunctionComponent<Props> = ({repoData}) => {
    if (!repoData || repoData.length !==  0) return null;

    return (
        <StyledImage
            src={NoVulns}
            alt="No vulns found"
        />
    );
};

NoVulnsMessage.propTypes = {};

export default NoVulnsMessage;

