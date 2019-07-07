import React from 'react'
import styled from 'styled-components';

const StyledCard = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    flex: 1 1 300px;
    border-radius: 15px;
    height: 170px;
    background-color: #3a4549;
    -webkit-box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.63);
    -moz-box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.63);
    box-shadow: 10px 10px 20px -1px rgba(0,0,0,0.63);
    word-break: break-word;
    
    .pkg {
        font-size: 24px;
        color: #39ff15;
        padding: 20px;
    }
    
    .description {
        height: 100px;
        text-overflow: ellipsis;
        color: #b0a9a9;
        padding-left: 5px;
        padding-right: 5px;

    }
    
    .vuln-count {
        color: #b0a9a9;
        padding-bottom: 10px;
    }
`;

const Card = ({
    name,
    desc,
    count
}) => {

    return (
        <StyledCard>
            <div className="pkg">{name}</div>
            <div className="description">
                {desc}
            </div>
            <div className="vuln-count">
                Vuns: {count}
            </div>
        </StyledCard>
    )
}

export default Card;