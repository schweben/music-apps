import React, { useState } from 'react';

import HelpPanel from './HelpPanel';
import { MajorKey } from './Keys';
import { INTERVALS } from './musicConstants';

type IntervalDirection = 'up' | 'down';

type IntervalFormData = {
    note: string;
    interval: string;
    direction: IntervalDirection;
};

const Intervals = () => {
    const [transposedNote, setTransposedNote] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as IntervalFormData;
        const interval = Number(formData.interval);

        setTransposedNote(transpose(formData.note, formData.direction === 'up' ? interval : interval * -1));
    };

    const formValid = (): boolean => {
        return true;
    }

    const clearValues = () => {
        setTransposedNote(undefined);
    };

    const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            clearValues();
        }
    };

    const checkNote = (note: string, enharmonic: string): boolean => {
        return note === enharmonic ? true : enharmonic.split('/').includes(note);
    };

    const getNoteIndex = (note: string): number => {
        const chromatic = MajorKey.getFullChromatics();
        const result = chromatic.find(chromatic => {
            if (checkNote(note, chromatic)) {
                return chromatic;
            }
        })
        return result ? chromatic.indexOf(result) : -1;
    };

    const transpose = (source: string, interval: number): string => {
        const chromatic = MajorKey.getFullChromatics();
        const sourceIndex = getNoteIndex(source);
        let index = sourceIndex;

        for (let i = 0; interval < 0 ? i > interval: i < interval; interval < 0 ? i-- : i++) {
            index = interval > 0 ? (index + 1) % chromatic.length : (index - 1 + chromatic.length) % chromatic.length;
        }

        return chromatic[index];
    };

    return (
    <div>
        <div className="panel">
            <div className="panel-header">
                <h1>Intervals</h1>
                <HelpPanel message={['Figure out intervals']}/>
            </div>
            <h2>Choose an interval</h2>
            <form id="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <select id="note" name="note" defaultValue="-" onChange={clearValues}>
                        <option key="-" value="-">---</option>
                        {MajorKey.getFullChromatics().map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="interval">Interval:</label>
                        <select id="interval" name="interval" defaultValue="-" onChange={clearValues}>
                        <option key="-" value="-">---</option>
                        {Object.entries(INTERVALS).map(([semitones, label]) => (
                            <option key={semitones} value={semitones}>{label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <span className="form-label">Direction:</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="up" style={{ minWidth: 'unset', textAlign: 'left' }}><input type="radio" id="up" name="direction" value="up" onChange={handleDirectionChange}/>Up</label>
                        <label htmlFor="down" style={{ minWidth: 'unset', textAlign: 'left' }}><input type="radio" id="down" name="direction" value="down" onChange={handleDirectionChange}/>Down</label>
                    </div>
                </div>
                <button disabled={!formValid} type="submit" style={{ marginTop: '0.5rem' }}>Transpose</button>
            </form>
        </div>
        {transposedNote !== undefined && (
            <div className="panel">
                <h3>{transposedNote}</h3>
            </div>
        )}
    </div>
    );
}

export default Intervals;
