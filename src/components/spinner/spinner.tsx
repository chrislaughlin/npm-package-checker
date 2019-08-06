import React, {FunctionComponent} from 'react';

import './spinner.css';

type Props = {
    showSpinner: Boolean
}

const Spinner:FunctionComponent<Props> = ({showSpinner}) => {
    if (!showSpinner) return null;

    return (
        <div className="spinner"/>
    )
}

export default Spinner;

