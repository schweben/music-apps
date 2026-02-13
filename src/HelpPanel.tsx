import './HelpPanel.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const HelpPanel = ({message}: {message: string[]}) => {
    const [helpMessage, setHelpMessage] = useState<string[]>();

    return (
        <div>
            <button type="button" className="help-button" onClick={() => setHelpMessage(message)}>?</button>
            {helpMessage !== undefined && createPortal(
                <div className='help-panel'>
                    {message.map((msg, index) => (
                        <p key={`${index}-${msg}`}>{msg}</p>
                    ))}
                    <button type="button" className="close-button" onClick={() => setHelpMessage(undefined)}>X</button>
                </div>,
                document.body
            )}
        </div>
    );
}

export default HelpPanel;
