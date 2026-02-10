import './Transpose.css';
import React, { useState } from 'react';
import { CHROMATIC, INTERVALS, KEY_SIGNATURES, TRANSPOSING_INSTRUMENTS } from './Keys';

const Transpose = () => {
    const [transposedKey, setTransposedKey] = useState<string>();
    const [transposedNote, setTransposedNote] = useState<string>();
    const [transpositionInterval, setTranspositionInterval] = useState<number>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;

        // Find the interval between the source and target instruments
        const interval: number = findInstrumentInterval(formData.sourceInstrument, formData.targetInstrument);

        // The transposition will be in the opposite direction to the interval
        const transposingInterval = -interval;

        if (formData.sourceKey !== '-') {
            const transposedKey = transpose(formData.sourceKey, transposingInterval)
            setTransposedKey(getKeySignature(transposedKey));
        } else {
            setTransposedKey(undefined);
        }
        if (formData.sourceNote !== '-') {
            setTransposedNote(transpose(formData.sourceNote, transposingInterval));
        } else {
            setTransposedNote(undefined);
        }
        setTranspositionInterval(transposingInterval);
    };

    const checkNote = (note: string, enharmonic: string): boolean => {
        return note === enharmonic ? note : enharmonic.split('/').includes(note);
        // return enharmonic.split('/').includes(note);
    };

    const getNoteIndex = (note: string): number => {
        const result = CHROMATIC.find(chromatic => {
            if (checkNote(note, chromatic)) {
                return chromatic;
            }
        })
        return result ? CHROMATIC.indexOf(result) : -1;
    };

    const findInstrumentInterval = (source: string, target: string): number => {

        if (source === target) return 0;

        // const sourceIndex = CHROMATIC.indexOf(source);
        const sourceIndex = getNoteIndex(source);

        let index = sourceIndex;

        let forwards: number = 0;
        let reverse: number = 0;

        // Calculate the number of semi-tones to transpose forwards
        do {
            forwards++;
            index = (index + 1) % CHROMATIC.length;
        } while (!checkNote(target, CHROMATIC[index]));

        // Calculate the number of semi-tones to transpose backwards
        index = sourceIndex;
        do {
            reverse++;
            index = (index - 1 + CHROMATIC.length) % CHROMATIC.length;
        } while (!checkNote(target, CHROMATIC[index]));

        if (forwards === reverse) {
            // If the forwards or backwareds intervals are the same transpose down
            return forwards;
        } else {
            // Return the smallest number, make negative if the interval is backwards
            return forwards < reverse ? forwards : reverse * -1;
        }
    };

    const transpose = (source: string, interval: number): string => {
        // const sourceIndex = CHROMATIC.indexOf(source);
        const sourceIndex = getNoteIndex(source);
        let index = sourceIndex;

        for (let i = 0; interval < 0 ? i > interval: i < interval; interval < 0 ? i-- : i++) {
            index = interval > 0 ? (index + 1) % CHROMATIC.length : (index - 1 + CHROMATIC.length) % CHROMATIC.length;
        }

        return CHROMATIC[index];
    };

    const clearValues = () => {
        setTransposedKey(undefined);
        setTransposedNote(undefined);
        setTranspositionInterval(undefined);
    }

    const getKeySignature = (enharmonic: string) : string => {
        const key = Object.keys(KEY_SIGNATURES).find(key => {
            if (checkNote(key, enharmonic)) {
                return key;
            }
        });
        return key ?? "";
    }

    return (
    <div>
        <div className="panel">
            <h1>Transposition</h1>
            <form id="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sourceInstrument">Source instrument key:</label>
                    <select id="sourceInstrument" name="sourceInstrument" defaultValue="C" onChange={clearValues}>
                        {TRANSPOSING_INSTRUMENTS.map((instrument) => (
                            <option key={instrument} value={instrument}>{instrument}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="targetInstrument">Target instrument key:</label>
                        <select id="targetInstrument" name="targetInstrument" defaultValue="C" onChange={clearValues}>
                        {TRANSPOSING_INSTRUMENTS.map((instrument) => (
                            <option key={instrument} value={instrument}>{instrument}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sourceKey">Source key signature:</label>
                    <select id="sourceKey" name="sourceKey" defaultValue="-" onChange={clearValues}>
                        <option value="-">---</option>
                        { Object.entries(KEY_SIGNATURES).map(([key, value]) => (
                            <option key={key} value={key}>{key} ({value})</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sourceNote">Source note:</label>
                    <select id="sourceNote" name="sourceNote" defaultValue="-" onChange={clearValues}>
                        <option value="-">---</option>
                        {CHROMATIC.map((note) => (
                        <option key={note} value={note}>{note}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Transpose</button>
            </form>
        </div>
        {transpositionInterval !== undefined && (
            <div className='panel'>
                {transpositionInterval !== 0 ? (
                    <>
                        <h3>Transposing {transpositionInterval > 0 ? 'up' : 'down'} a {INTERVALS[Math.abs(transpositionInterval)]}</h3>
                        <h3 className={transposedKey ? '' : 'hidden'}>Transposed key signature: {transposedKey} ({transposedKey ? KEY_SIGNATURES[transposedKey] : ''})</h3>
                        <h3 className={transposedNote ? '' : 'hidden'}>Transposed note: {transposedNote}</h3>
                    </>
                ) : (
                    <h2>No transposition needed, keys are in unison</h2>
                )}
            </div>
        )}
    </div>
    );
}

export default Transpose;
