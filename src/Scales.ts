export class Scale {
    private readonly name: string;
    private readonly sharps: number|undefined;
    private readonly flats: number|undefined;
    private readonly range: string;

    constructor(name: string, range: string, sharps?: number, flats?: number) {
        this.name = name;
        this.range = range;
        this.sharps = sharps;
        this.flats = flats;
    }

    public getName(): string {
        return this.name;
    }

    public getRange(): string {
        return this.range;
    }

    public getKey(): string|null {
        if (this.sharps === undefined || this.flats === undefined) {
            return null;
        }
        if (this.sharps > 0) {
            return this.sharps > 1 ? `${this.sharps} sharps` : `${this.sharps} sharp`;
        } else if (this.flats > 0) {
            return this.flats > 1 ? `${this.flats} flats` : `${this.flats} flat`;
        } else {
            return 'No sharps or flats';
        }
    }
}

export const MAJOR_SCALES: Scale[] = [
    new Scale("C Major", "2 octaves", 0, 0,),
    new Scale("G Major", "12th", 1, 0,),
    new Scale("D Major", "12th", 2, 0,),
    new Scale("A Major", "2 octaves", 3, 0),
    new Scale("E Major", "12th", 4, 0),
    new Scale("B Major", "2 octaves", 5, 0),
    new Scale("F# Major", "2 octaves", 6, 0),
    new Scale("F Major", "12th", 0, 1),
    new Scale("Bb Major", "2 octaves", 0, 2),
    new Scale("Eb Major", "12th", 0, 3),
    new Scale("Ab Major", "2 octaves", 0, 4),
    new Scale("Db Major", "12th", 0, 5),
    new Scale("Gb Major", "12th", 0, 6),
];

export const HARMONIC_MINOR_SCALES: Scale[] = [
    new Scale("A Harmonic Minor", "2 octaves", 0, 0),
    new Scale("E Harmonic Minor", "12th", 1, 0),
    new Scale("B Harmonic Minor", "2 octaves", 2, 0),
    new Scale("F# Harmonic Minor", "2 octaves", 3, 0),
    new Scale("C# Harmonic Minor", "2 octaves", 4, 0),
    new Scale("G# Harmonic Minor", "12th", 5, 0),
    new Scale("D# Harmonic Minor", "12th", 6, 0),
    new Scale("D Harmonic Minor", "12th", 0, 1),
    new Scale("G Harmonic Minor", "12th", 0, 2),
    new Scale("C Harmonic Minor", "2 octaves", 0, 3),
    new Scale("F Harmonic Minor", "12th", 0, 4),
    new Scale("Bb Harmonic Minor", "2 octaves", 0, 5),
    new Scale("Eb Harmonic Minor", "2 octaves", 0, 6),
];

export const MELODIC_MINOR_SCALES: Scale[] = [
    new Scale("A Melodic Minor", "2 octaves", 0, 0),
    new Scale("E Melodic Minor", "12th", 1, 0),
    new Scale("B Melodic Minor", "2 octaves", 2, 0),
    new Scale("F# Melodic Minor", "2 octaves", 3, 0),
    new Scale("C# Melodic Minor", "2 octaves", 4, 0),
    new Scale("G# Melodic Minor", "12th", 5, 0),
    new Scale("D# Melodic Minor", "12th", 6, 0),
    new Scale("D Melodic Minor", "12th", 0, 1),
    new Scale("G Melodic Minor", "12th", 0, 2),
    new Scale("C Melodic Minor", "2 octaves", 0, 3),
    new Scale("F Melodic Minor", "12th", 0, 4),
    new Scale("Bb Melodic Minor", "2 octaves", 0, 5),
    new Scale("Eb Melodic Minor", "2 octaves", 0, 6),
];

export const CHROMATIC_SCALES: Scale[] = [
    new Scale("Chromatic scale starting on C", "2 octaves"),
    new Scale("Chromatic scale starting on B", "2 octaves"),
    new Scale("Chromatic scale starting on F#", "2 octaves"),
    new Scale("Chromatic scale starting on A", "2 octaves"),
    new Scale("Chromatic scale starting on Bb", "2 octaves"),
    new Scale("Chromatic scale starting on G", "2 octaves"),
    new Scale("Chromatic scale starting on Ab", "2 octaves"),
];

export const PENTATONIC_SCALES: Scale[] = [
    new Scale("C Pentatonic", "2 octaves", 0, 0),
    new Scale("G Pentatonic", "2 octaves", 1, 0),
    new Scale("D Pentatonic", "12th", 2, 0),
    new Scale("A Pentatonic", "2 octaves", 3, 0),
    new Scale("E Pentatonic", "12th", 4, 0),
    new Scale("B Pentatonic", "2 octaves", 5, 0),
    new Scale("F# Pentatonic", "2 octaves", 6, 0),
    new Scale("F Pentatonic", "12th", 0, 1),
    new Scale("Bb Pentatonic", "2 octaves", 0, 2),
    new Scale("Eb Pentatonic", "12th", 0, 3),
    new Scale("Ab Pentatonic", "2 octaves", 0, 4),
    new Scale("Db Pentatonic", "12th", 0, 5),
    new Scale("Gb Pentatonic", "12th", 0, 6),
];

export const DOMINANT_7TH_SCALES: Scale[] = [
    new Scale("Dominant 7th in the key of C", "2 octaves", 0, 0),
    new Scale("Dominant 7th in the key of G", "12th", 1, 0),
    new Scale("Dominant 7th in the key of D", "2 octaves", 2, 0),
    new Scale("Dominant 7th in the key of A", "12th", 3, 0),
    new Scale("Dominant 7th in the key of E", "12th", 4, 0),
    new Scale("Dominant 7th in the key of B", "2 octaves", 5, 0),
    new Scale("Dominant 7th in the key of F#", "2 octaves", 6, 0),
    new Scale("Dominant 7th in the key of Bb", "12th", 0, 2),
    new Scale("Dominant 7th in the key of Eb", "2 octaves", 0, 3),
    new Scale("Dominant 7th in the key of Ab", "12th", 0, 4),
    new Scale("Dominant 7th in the key of Db", "2 octaves", 0, 5),
    new Scale("Dominant 7th in the key of Gb", "12th", 0, 6),
];

export const DIMINISHED_7TH_SCALES: Scale[] = [
    new Scale("Diminshed 7th starting on G", "2 octaves"),
    new Scale("Diminshed 7th starting on A",  "2 octaves"),
    new Scale("Diminshed 7th starting on G#", "2 octaves"),
    new Scale("Diminshed 7th starting on Bb", "2 octaves"),
    new Scale("Diminshed 7th starting on F#", "2 octaves"),
    new Scale("Diminshed 7th starting on B", "2 octaves"),
    new Scale("Diminshed 7th starting on C", "2 octaves"),
];
