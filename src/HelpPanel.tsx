import './HelpPanel.css';
import { useState } from 'react';

const HelpPanel = ({message}: {message: string}) => {
    const [helpMessage, setHelpMessage] = useState<string>();

    return (
        <div>
            <button type="button" className="help-button" onClick={() => setHelpMessage(message)}>?</button>
            { helpMessage !== undefined && (
            <div className='help-panel'>
                <h3>{helpMessage}</h3>
                    <button type="button" className="close-button" onClick={() => setHelpMessage(undefined)}>X</button>
            </div>
            )}
        </div>
    );
}

export default HelpPanel;
