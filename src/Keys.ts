/**
 * Represents a major key with its properties and utility methods.
 */
export class MajorKey {

    static readonly C: MajorKey = new MajorKey('C', 0, 0, 'A');
    static readonly G: MajorKey = new MajorKey('G', 1, 0, 'E');
    static readonly D: MajorKey = new MajorKey('D', 2, 0, 'B');
    static readonly A: MajorKey = new MajorKey('A', 3, 0, 'F♯');
    static readonly E: MajorKey = new MajorKey('E', 4, 0, 'C♯');
    static readonly B: MajorKey = new MajorKey('B', 5, 0, 'G♯');
    static readonly F_SHARP: MajorKey = new MajorKey('F♯', 6, 0, 'D♯');
    static readonly C_SHARP: MajorKey = new MajorKey('C♯', 7, 0, 'A♯', 'D♭');
    static readonly F: MajorKey = new MajorKey('F', 0, 1, 'D');
    static readonly B_FLAT: MajorKey = new MajorKey('B♭', 0, 2, 'G', 'A♯');
    static readonly E_FLAT: MajorKey = new MajorKey('E♭', 0, 3, 'C', 'D♯');
    static readonly A_FLAT: MajorKey = new MajorKey('A♭', 0, 4, 'F', 'G♯');
    static readonly D_FLAT: MajorKey = new MajorKey('D♭', 0, 5, 'B♭', 'C♯');
    static readonly G_FLAT: MajorKey = new MajorKey('G♭', 0, 6, 'E♭');
    static readonly C_FLAT: MajorKey = new MajorKey('C♭', 0, 7, 'A♭');

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

    public getKeySignature(): string {
        if (this.sharps === undefined || this.flats === undefined) {
            return '';
        }
        if (this.sharps > 0) {
            return `${this.sharps}♯`;
        } else if (this.flats > 0) {
            return `${this.flats}♭`;
        } else {
            return 'No ♯ or ♭';
        }
    }

    /**
     * Get the key signature for a given key name. Returns '?' if not found.
     * @param keyName The name of the key.
     */
    static getKeySignature(keyName: string): string {
        const sig = this.getKeySignatures()[keyName];
        return sig !== undefined ? sig : '?';
    }

    /**
     * Get the dual key signature for a compound key name (e.g., 'C/G').
     * @param keyName The compound key name.
     */
    static getDualKeySignature(keyName: string): string {
        const keySignatures = keyName.split('/').map(part => {
            return this.getKeySignature(part);
        });
        return keySignatures.join('/');
    }

    /**
     * Get a map of all key names to their signatures.
     */
    static getKeySignatures(): Record<string, string> {
        return {
            [this.C.getName()]: this.C.getKeySignature(),
            [this.G.getName()]: this.G.getKeySignature(),
            [this.D.getName()]: this.D.getKeySignature(),
            [this.A.getName()]: this.A.getKeySignature(),
            [this.E.getName()]: this.E.getKeySignature(),
            [this.B.getName()]: this.B.getKeySignature(),
            [this.F_SHARP.getName()]: this.F_SHARP.getKeySignature(),
            [this.C_SHARP.getName()]: this.C_SHARP.getKeySignature(),
            [this.F.getName()]: this.F.getKeySignature(),
            [this.B_FLAT.getName()]: this.B_FLAT.getKeySignature(),
            [this.E_FLAT.getName()]: this.E_FLAT.getKeySignature(),
            [this.A_FLAT.getName()]: this.A_FLAT.getKeySignature(),
            [this.D_FLAT.getName()]: this.D_FLAT.getKeySignature(),
            [this.G_FLAT.getName()]: this.G_FLAT.getKeySignature(),
            [this.C_FLAT.getName()]: this.C_FLAT.getKeySignature()
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

    /**
     * Get all major key names in circle of fifths order.
     */
    static getMajorKeys(): string[] {
        return [
            this.G.getName(),
            this.D.getName(),
            this.A.getName(),
            this.E.getName(),
            this.B.getName(),
            this.F_SHARP.getName(),
            this.D_FLAT.getName(),
            this.A_FLAT.getName(),
            this.E_FLAT.getName(),
            this.B_FLAT.getName(),
            this.F.getName(),
            this.C.getName()
        ];
    }

    /**
     * Get all major key names for the circle of fifths, including enharmonics.
     */
    static getMajorKeysForCircleOfFifths(): string[] {
        return [
            this.G.getName(),
            this.D.getName(),
            this.A.getName(),
            this.E.getName(),
            this.B.getName() + "/" + this.C_FLAT.getName(),
            this.F_SHARP.getName() + "/" + this.G_FLAT.getName(),
            this.D_FLAT.getName() + "/" + this.C_SHARP.getName(),
            this.A_FLAT.getName(),
            this.E_FLAT.getName(),
            this.B_FLAT.getName(),
            this.F.getName(),
            this.C.getName()
        ];
    }
    /**
     * Get all relative minor key names in circle of fifths order.
     */
    static getMinorKeys(): string[] {
        return [
            this.G.getRelativeMinor(),
            this.D.getRelativeMinor(),
            this.A.getRelativeMinor(),
            this.E.getRelativeMinor(),
            this.B.getRelativeMinor(),
            this.F_SHARP.getRelativeMinor(),
            this.D_FLAT.getRelativeMinor(),
            this.A_FLAT.getRelativeMinor(),
            this.E_FLAT.getRelativeMinor(),
            this.B_FLAT.getRelativeMinor(),
            this.F.getRelativeMinor(),
            this.C.getRelativeMinor()
        ];
    }
};
