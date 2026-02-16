import { MajorKey } from "./Keys";

export class Scale {
    private readonly name: string;
    private readonly key: MajorKey | undefined;
    private readonly range: string;

    constructor(name: string, range: string, key?: MajorKey) {
        this.name = name;
        this.range = range;
        this.key = key;
    }

    public getName(): string {
        return this.name;
    }

    public getRange(): string {
        return this.range;
    }

    public getKey(): string | null {
        return this.key === undefined ? null : this.key.getKeySignature();
    }
}

export const MAJOR_SCALES: Scale[] = [
    new Scale("C Major", "2 octaves", MajorKey.C),
    new Scale("G Major", "12th", MajorKey.G),
    new Scale("D Major", "12th", MajorKey.D),
    new Scale("A Major", "2 octaves", MajorKey.A),
    new Scale("E Major", "12th", MajorKey.E),
    new Scale("B Major", "2 octaves", MajorKey.B),
    new Scale("F♯ Major", "2 octaves", MajorKey.F_SHARP),
    new Scale("F Major", "12th", MajorKey.F),
    new Scale("B♭ Major", "2 octaves", MajorKey.B_FLAT),
    new Scale("E♭ Major", "12th", MajorKey.E_FLAT),
    new Scale("A♭ Major", "2 octaves", MajorKey.A_FLAT),
    new Scale("D♭ Major", "12th", MajorKey.D_FLAT),
    new Scale("G♭ Major", "12th", MajorKey.G_FLAT)
];

export const HARMONIC_MINOR_SCALES: Scale[] = [
    new Scale("A Harmonic Minor", "2 octaves", MajorKey.C),
    new Scale("E Harmonic Minor", "12th", MajorKey.G),
    new Scale("B Harmonic Minor", "2 octaves", MajorKey.D),
    new Scale("F♯ Harmonic Minor", "2 octaves", MajorKey.A),
    new Scale("C♯ Harmonic Minor", "2 octaves", MajorKey.E),
    new Scale("G♯ Harmonic Minor", "12th", MajorKey.B),
    new Scale("D♯ Harmonic Minor", "12th", MajorKey.F_SHARP),
    new Scale("D Harmonic Minor", "12th", MajorKey.F),
    new Scale("G Harmonic Minor", "12th", MajorKey.B_FLAT),
    new Scale("C Harmonic Minor", "2 octaves", MajorKey.E_FLAT),
    new Scale("F Harmonic Minor", "12th", MajorKey.A_FLAT),
    new Scale("B♭ Harmonic Minor", "2 octaves", MajorKey.D_FLAT),
    new Scale("E♭ Harmonic Minor", "2 octaves", MajorKey.G_FLAT)
];

export const MELODIC_MINOR_SCALES: Scale[] = [
    new Scale("A Melodic Minor", "2 octaves", MajorKey.C),
    new Scale("E Melodic Minor", "12th", MajorKey.G),
    new Scale("B Melodic Minor", "2 octaves", MajorKey.G),
    new Scale("F♯ Melodic Minor", "2 octaves", MajorKey.A),
    new Scale("C♯ Melodic Minor", "2 octaves", MajorKey.E),
    new Scale("G♯ Melodic Minor", "12th", MajorKey.B),
    new Scale("D♯ Melodic Minor", "12th", MajorKey.F_SHARP),
    new Scale("D Melodic Minor", "12th", MajorKey.F),
    new Scale("G Melodic Minor", "12th", MajorKey.B_FLAT),
    new Scale("C Melodic Minor", "2 octaves", MajorKey.E_FLAT),
    new Scale("F Melodic Minor", "12th", MajorKey.A_FLAT),
    new Scale("B♭ Melodic Minor", "2 octaves", MajorKey.D_FLAT),
    new Scale("E♭ Melodic Minor", "2 octaves", MajorKey.G_FLAT)
];

export const CHROMATIC_SCALES: Scale[] = [
    new Scale("Chromatic scale starting on C", "2 octaves"),
    new Scale("Chromatic scale starting on B", "2 octaves"),
    new Scale("Chromatic scale starting on F♯", "2 octaves"),
    new Scale("Chromatic scale starting on A", "2 octaves"),
    new Scale("Chromatic scale starting on B♭", "2 octaves"),
    new Scale("Chromatic scale starting on G", "2 octaves"),
    new Scale("Chromatic scale starting on A♭", "2 octaves")
];

export const PENTATONIC_SCALES: Scale[] = [
    new Scale("C Pentatonic", "2 octaves", MajorKey.C),
    new Scale("G Pentatonic", "2 octaves", MajorKey.G),
    new Scale("D Pentatonic", "12th", MajorKey.D),
    new Scale("A Pentatonic", "2 octaves", MajorKey.A),
    new Scale("E Pentatonic", "12th", MajorKey.E),
    new Scale("B Pentatonic", "2 octaves", MajorKey.B),
    new Scale("F♯ Pentatonic", "2 octaves", MajorKey.F_SHARP),
    new Scale("F Pentatonic", "12th", MajorKey.F),
    new Scale("B♭ Pentatonic", "2 octaves", MajorKey.B_FLAT),
    new Scale("E♭ Pentatonic", "12th", MajorKey.E_FLAT),
    new Scale("A♭ Pentatonic", "2 octaves", MajorKey.A_FLAT),
    new Scale("D♭ Pentatonic", "12th", MajorKey.D_FLAT),
    new Scale("G♭ Pentatonic", "12th", MajorKey.G_FLAT)
];

export const DOMINANT_7TH_SCALES: Scale[] = [
    new Scale("Dominant 7th in the key of C", "2 octaves", MajorKey.C),
    new Scale("Dominant 7th in the key of G", "12th", MajorKey.G),
    new Scale("Dominant 7th in the key of D", "2 octaves", MajorKey.G),
    new Scale("Dominant 7th in the key of A", "12th", MajorKey.A),
    new Scale("Dominant 7th in the key of E", "12th", MajorKey.E),
    new Scale("Dominant 7th in the key of B", "2 octaves", MajorKey.B),
    new Scale("Dominant 7th in the key of F♯", "2 octaves", MajorKey.F_SHARP),
    new Scale("Dominant 7th in the key of B♭", "12th", MajorKey.B_FLAT),
    new Scale("Dominant 7th in the key of E♭", "2 octaves", MajorKey.E_FLAT),
    new Scale("Dominant 7th in the key of A♭", "12th", MajorKey.A_FLAT),
    new Scale("Dominant 7th in the key of D♭", "2 octaves", MajorKey.D_FLAT),
    new Scale("Dominant 7th in the key of G♭", "12th", MajorKey.G_FLAT)
];

export const DIMINISHED_7TH_SCALES: Scale[] = [
    new Scale("Diminshed 7th starting on G", "2 octaves"),
    new Scale("Diminshed 7th starting on A",  "2 octaves"),
    new Scale("Diminshed 7th starting on G♯", "2 octaves"),
    new Scale("Diminshed 7th starting on B♭", "2 octaves"),
    new Scale("Diminshed 7th starting on F♯", "2 octaves"),
    new Scale("Diminshed 7th starting on B", "2 octaves"),
    new Scale("Diminshed 7th starting on C", "2 octaves")
];
