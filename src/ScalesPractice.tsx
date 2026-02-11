import './ScalesPractice.css'
import { useState } from 'react';
import { CHROMATIC_SCALES, DIMINISHED_7TH_SCALES, DOMINANT_7TH_SCALES, HARMONIC_MINOR_SCALES, MAJOR_SCALES, MELODIC_MINOR_SCALES, PENTATONIC_SCALES, type Scale } from './Scales';
import HelpPanel from './HelpPanel';

const ScalesPractice = () => {
    const [scale, setScale] = useState<Scale>();
    const [showKey, setShowKey] = useState<boolean>(false);
    const [helpMessage, setHelpMessage] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        event.preventDefault();

        setShowKey(false);

        const scales: Scale[] = [];

        const formData = Object.fromEntries(new FormData(event.currentTarget).entries());

        if (formData.major) {
            scales.push(...MAJOR_SCALES);
        }
        if (formData.harmonic) {
            scales.push(...HARMONIC_MINOR_SCALES)
        }
        if (formData.melodic) {
            scales.push(...MELODIC_MINOR_SCALES);
        }
        if (formData.chromatic) {
            scales.push(...CHROMATIC_SCALES);
        }
        if (formData.pentatonic) {
            scales.push(...PENTATONIC_SCALES);
        }
        if (formData.dominant) {
            scales.push(...DOMINANT_7TH_SCALES);
        }
        if (formData.diminished) {
            scales.push(...DIMINISHED_7TH_SCALES);
        }

        // Don't generate a scale if no types are selected
        if (scales.length === 0) {
            setScale(undefined);
            return;
        }

        // Ensure that we always get a different scale (if possible)
        let randomScale: Scale;
        if (scales.length === 1) {
            // Only one scale available, just use it
            randomScale = scales[0];
        } else {
            // Multiple scales available, find a different one
            do {
                const random = Math.floor(Math.random() * (scales.length));
                randomScale = scales[random];
            } while (randomScale === scale);
        }
        setScale(randomScale);
    };

    const clearScale = () => {
        setScale(undefined);
        setShowKey(false);
    }

    return (
        <div>
            <div className="panel">
                <div className="panel-header">
                    <h1>Scales Practice</h1>
                    <HelpPanel message="This presents the user with a list of different types of musical scale. One or more can be selected and the application will
                                        then choose a random scale for the user to practice from the selected choices."/>
                </div>
                <h2>Select which type of scale to practice</h2>
                <form id="form" onSubmit={handleSubmit}>
                    <ul>
                        <li><label><input type="checkbox" name="major" defaultChecked={true} onClick={clearScale} />Major</label></li>
                        <li><label><input type="checkbox" name="harmonic" onClick={clearScale} />Harmonic Minor</label></li>
                        <li><label><input type="checkbox" name="melodic" onClick={clearScale} />Melodic Minor</label></li>
                        <li><label><input type="checkbox" name="chromatic" onClick={clearScale} />Chromatic</label></li >
                        <li><label><input type="checkbox" name="pentatonic" onClick={clearScale} />Pentatonic</label></li >
                        <li><label><input type="checkbox" name="dominant" onClick={clearScale} />Dominant 7th</label></li >
                        <li><label><input type="checkbox" name="diminished" onClick={clearScale} />Diminished 7th</label></li >
                    </ul>
                    <button type="submit">Get a scale</button>
                </form>
            </div>
            {scale && (
                <div className='panel'>
                    <h3>{scale.getName()} ({scale.getRange()}){showKey ? " - " + scale.getKey() : ""}</h3>
                    <button disabled={scale.getKey() === null} onClick={() => { setShowKey(!showKey); }}>{showKey ? "Hide key" : "Show key"}</button>
                </div>
            )}
            {helpMessage !== undefined && (
                <div className='help-panel'>
                    <h3>{helpMessage}</h3>
                    <button type="button" className="close-button" onClick={() => setHelpMessage(undefined)}>X</button>
                </div>
            )}
        </div>
    )
}

export default ScalesPractice;
