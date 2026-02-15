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
    "C": "no sharps or flats",
    "G": "1 sharp",
    "D": "2 sharps",
    "A": "3 sharps",
    "E": "4 sharps",
    "B": "5 sharps",
    "F♯": "6 sharp",
    "C♯": "7 sharp",
    "F": "1 flat",
    "B♭": "2 flat",
    "E♭": "3 flat",
    "A♭": "4 flat",
    "D♭": "5 flat",
    "G♭": "6 flat",
    "C♭": "7 flat"
};

export class MajorKey {
    private readonly name: string;
    private readonly sharps: number;
    private readonly flats: number;
    private readonly enharmonic: string | undefined;
    private readonly relativeMinor: string;

    constructor(name: string, sharps: number, flats: number, relativeMinor: string, enharmonic?: string) {
        this.name = name;
        this.sharps = sharps;
        this.flats = flats;
        this.relativeMinor = relativeMinor;
        this.enharmonic = enharmonic;
    }

    public getName(): string {
        return this.name;
    }

    public getRelativeMinor(): string {
        return this.relativeMinor;
    }

    public getEnharmonic(): string | undefined {
        return this.enharmonic;
    }

    public getKeySignature(): string | null {
        if (this.sharps === undefined || this.flats === undefined) {
            return null;
        }
        if (this.sharps > 0) {
            return `${this.sharps}♯`;
        } else if (this.flats > 0) {
            return `${this.flats}♭`;
        } else {
            return '';
        }
    }
}

export const MAJOR_KEYS: MajorKey[] = [
    new MajorKey('C', 0, 0, 'A'),
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('D', 1, 0, 'E')
    new MajorKey('A', 1, 0, 'E')
    new MajorKey('E', 1, 0, 'E')
    new MajorKey('B', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')
    new MajorKey('G', 1, 0, 'E')

];
