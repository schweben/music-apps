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

    static readonly C: MajorKey = new MajorKey('C', 0, 0, 'A');
    static readonly G = new MajorKey('G', 1, 0, 'E');
    static readonly D = new MajorKey('D', 2, 0, 'B');
    static readonly A = new MajorKey('A', 3, 0, 'F♯');
    static readonly E = new MajorKey('E', 4, 0, 'C♯');
    static readonly B = new MajorKey('B', 5, 0, 'G♯');
    static readonly F_SHARP= new MajorKey('F♯', 6, 0, 'D♯');
    static readonly C_SHARP = new MajorKey('C♯', 7, 0, 'A♯', 'D♭');
    static readonly F = new MajorKey('F', 0, 1, 'D');
    static readonly B_FLAT = new MajorKey('B♭', 0, 2, 'G', 'A♯');
    static readonly E_FLAT = new MajorKey('E♭', 0, 3, 'C', 'D♯');
    static readonly A_FLAT = new MajorKey('A♭', 0, 4, 'F', 'G♯');
    static readonly D_FLAT = new MajorKey('D♭', 0, 5, 'B♭', 'C♯');
    static readonly G_FLAT = new MajorKey('G♭', 0, 6, 'E♭');
    static readonly C_FLAT = new MajorKey('C♭', 0, 7, 'A♭');

    private readonly name: string;
    private readonly sharps: number;
    private readonly flats: number;
    private readonly enharmonic: string | undefined;
    private readonly relativeMinor: string;

    private constructor(name: string, sharps: number, flats: number, relativeMinor: string, enharmonic?: string) {
        this.name = name;
        this.sharps = sharps;
        this.flats = flats;
        this.relativeMinor = relativeMinor;
        this.enharmonic = enharmonic;
    }

    public getName(): string {
        return this.name;
    }

    public getEnharmonicName(): string {
        return this.enharmonic ? `${this.name}/${this.enharmonic}` : this.name;
    }

    public getRelativeMinor(): string {
        return this.relativeMinor;
    }

    public getEnharmonic(): string | undefined {
        return this.enharmonic;
    }

    public getKeySignature(): string {
        if (this.sharps === undefined || this.flats === undefined) {
            return '';
        }
        if (this.sharps > 0) {
            return `${this.sharps}♯`;
        } else if (this.flats > 0) {
            return `${this.flats}♭`;
        } else {
            return '';
        }
    }

    static getKeySignatures(): Record<string, string> {
        return {
            [this.C.getName()]: this.C.getKeySignature()
        }
    }

    static getFullChromatics(): string[] {
        return [
            this.C.getEnharmonicName(),
            this.C_SHARP.getEnharmonicName(),
            this.D.getEnharmonicName(),
            this.E_FLAT.getEnharmonicName(),
            this.E.getEnharmonicName(),
            this.F.getEnharmonicName(),
            this.F_SHARP.getEnharmonicName(),
            this.G.getEnharmonicName(),
            this.A_FLAT.getEnharmonicName(),
            this.A.getEnharmonicName(),
            this.B_FLAT.getEnharmonicName(),
            this.B.getEnharmonicName()
        ];
    }
}
