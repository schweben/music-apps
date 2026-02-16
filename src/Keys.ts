export const TRANSPOSING_INSTRUMENTS: string[] = [
    "C",
    "D",
    "E♭",
    "E",
    "F",
    "A",
    "B♭",
    "B"
];

export const CHROMATIC: string[] = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B"
];

export const INTERVALS: Record<number, string> = {
    0: 'Unison',
    1: 'Minor 2nd',
    2: 'Major 2nd',
    3: 'Minor 3rd',
    4: 'Major 3rd',
    5: 'Perfect 4th',
    6: 'Augmented 4th',
    7: 'Perfect 5th',
    8: 'Minor 6th',
    9: 'Major 6th',
    10: 'Minor 7th',
    11: 'Major 7th',
    12: 'Octave'
};

export const KEY_SIGNATURES: Record<string, string> = {
    "C": "No sharps or flats",
    "G": "1 sharp",
    "D": "2 sharps",
    "A": "3 sharps",
    "E": "4 sharps",
    "B": "5 sharps",
    "F♯": "6 sharps",
    "C♯": "7 sharps",
    "F": "1 flat",
    "B♭": "2 flats",
    "E♭": "3 flats",
    "A♭": "4 flats",
    "D♭": "5 flats",
    "G♭": "6 flats",
    "C♭": "7 flats"
};
