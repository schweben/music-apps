import React, { useState } from 'react'
import './App.css'
import { CHROMATIC, INTERVALS } from './Keys';

function App() {
    const [transposedKey, setTransposedKey] = useState<string>();
    const [transposedNote, setTransposedNote] = useState<string>();
    const [transpositionInterval, setTranspositionInterval] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;

        // Find the interval between the source and target instruments
        const interval: number = findInstrumentInterval(formData.sourceInstrument, formData.targetInstrument);

        // The transposition will be in the opposite direction to the interval
        const transposingInterval = -interval;

        setTransposedKey(transpose(formData.sourceKey, transposingInterval));
        setTransposedNote(transpose(formData.sourceNote, transposingInterval));
        setTranspositionInterval(INTERVALS[Math.abs(interval)]);
    };

    const findInstrumentInterval = (source: string, target: string): number => {

        if (source === target) return 0;

        const sourceIndex = CHROMATIC.indexOf(source);

        let index = sourceIndex;

        let forwards: number = 0;
        let reverse: number = 0;

        // Calculate the number of semi-tones to transpose forwards
        do {
            forwards++;
            index = (index + 1) % CHROMATIC.length;
        } while (CHROMATIC[index] !== target);
        // Calculate the number of semi-tones to transpose backwards
        index = sourceIndex;
        do {
            reverse++;
            index = (index - 1 + CHROMATIC.length) % CHROMATIC.length;
        } while (CHROMATIC[index] !== target);
        // Return the smallest number, make negative if the interval is backwards
        return forwards < reverse ? forwards : reverse * -1;
    };

    const transpose = (source: string, interval: number): string => {
        const sourceIndex = CHROMATIC.indexOf(source);
        console.log(`Transposing '${source}' (index ${sourceIndex}) by '${interval}' steps`);
        let index = sourceIndex;

        for (let i = 0; interval < 0 ? i > interval: i < interval; interval < 0 ? i-- : i++) {
            index = interval > 0 ? (index + 1) % CHROMATIC.length : (index - 1 + CHROMATIC.length) % CHROMATIC.length;
            console.log(CHROMATIC[index]);
        }

        return CHROMATIC[index];
    };

    return (
    <div className="App">
        <h1>Transposition</h1>

        <form id="form" onSubmit={handleSubmit}>
            <h2>Source instrument</h2>
            <select name="sourceInstrument" defaultValue="Bb">
                <option value="A">A Trumpet</option>
                <option value="B">B Trumpet</option>
                <option value="Bb">Bb Trumpet</option>
                <option value="C">C Trumpet</option>
                <option value="D">D Trumpet</option>
                <option value="E">E Trumpet</option>
                <option value="D#">Eb Trumpet</option>
                <option value="F">F Trumpet</option>
            </select>

            <h2>Source key</h2>
            <select name="sourceKey" defaultValue="C">
                <option value="C">C (no sharps or flats)</option>
                <option value="G">G (1 sharp)</option>
                <option value="D">D (2 sharps)</option>
                <option value="A">A (3 sharps)</option>
                <option value="E">E (4 sharps)</option>
                <option value="B">B (5 sharps)</option>
                <option value="F#">F# (6 sharps)</option>
                <option value="C#">C# (7 sharps)</option>
                <option value="F">F (1 flat)</option>
                <option value="Bb">Bb (2 flatss)</option>
                <option value="Eb">Eb (3 flats)</option>
                <option value="Ab">Ab (4 flats)</option>
                <option value="Db">Db (5 flats)</option>
                <option value="Gb">Gb (6 flats)</option>
                <option value="Cb">Cb (7 flats)</option>
            </select>

            <h2>Source note</h2>
            <select name="sourceNote" defaultValue="C">
                <option value="C">C</option>
                <option value="C#">C#/Db</option>
                <option value="D">D</option>
                <option value="D#">D#/Eb</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#/Gb</option>
                <option value="G">G</option>
                <option value="G#">G#/Ab</option>
                <option value="A">A</option>
                <option value="Bb">A#/Bb</option>
                <option value="B">B</option>
            </select>

            <button type="submit">Transpose</button>

            <h2>Target instrument</h2>
            <select name="targetInstrument" defaultValue="Bb">
                <option value="A">A Trumpet</option>
                <option value="B">B Trumpet</option>
                <option value="Bb">Bb Trumpet</option>
                <option value="C">C Trumpet</option>
                <option value="D">D Trumpet</option>
                <option value="E">E Trumpet</option>
                <option value="D#">Eb Trumpet</option>
                <option value="F">F Trumpet</option>
            </select>

            <h2>Transposed key: {transposedKey} ({transpositionInterval})</h2>
            <h2>Transposed note: {transposedNote} ({transpositionInterval})</h2>
        </form>
    </div>
    );
}

export default App
