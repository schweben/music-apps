import { describe, it, expect } from 'vitest';
import { TRANSPOSING_INSTRUMENTS, CHROMATIC, INTERVALS, KEY_SIGNATURES, MajorKey } from './Keys';

describe('Keys Constants', () => {
  describe('TRANSPOSING_INSTRUMENTS', () => {
    it('should contain valid transposing instrument keys', () => {
      expect(TRANSPOSING_INSTRUMENTS).toBeDefined();
      expect(TRANSPOSING_INSTRUMENTS).toHaveLength(8);
    });

    it('should include common transposing instruments', () => {
      expect(TRANSPOSING_INSTRUMENTS).toContain('C');
      expect(TRANSPOSING_INSTRUMENTS).toContain('B♭');
      expect(TRANSPOSING_INSTRUMENTS).toContain('E♭');
      expect(TRANSPOSING_INSTRUMENTS).toContain('F');
    });

    it('should not contain duplicates', () => {
      const uniqueInstruments = new Set(TRANSPOSING_INSTRUMENTS);
      expect(uniqueInstruments.size).toBe(TRANSPOSING_INSTRUMENTS.length);
    });

    it('should be an array of strings', () => {
      TRANSPOSING_INSTRUMENTS.forEach(instrument => {
        expect(typeof instrument).toBe('string');
      });
    });
  });

  describe('CHROMATIC', () => {
    it('should contain 12 chromatic notes', () => {
      expect(CHROMATIC).toBeDefined();
      expect(CHROMATIC).toHaveLength(12);
    });

    it('should start with C', () => {
      expect(CHROMATIC[0]).toBe('C');
    });

    it('should end with B', () => {
      expect(CHROMATIC[11]).toBe('B');
    });

    it('should include enharmonic equivalents', () => {
      expect(CHROMATIC).toContain('C♯/D♭');
      expect(CHROMATIC).toContain('D♯/E♭');
      expect(CHROMATIC).toContain('G♯/A♭');
      expect(CHROMATIC).toContain('A♯/B♭');
    });

    it('should not contain duplicates', () => {
      const uniqueNotes = new Set(CHROMATIC);
      expect(uniqueNotes.size).toBe(CHROMATIC.length);
    });

    it('should contain natural notes E and F without sharps between them', () => {
      const eIndex = CHROMATIC.indexOf('E');
      const fIndex = CHROMATIC.indexOf('F');
      expect(fIndex - eIndex).toBe(1);
    });
  });

  describe('INTERVALS', () => {
    it('should define intervals from 0 to 12', () => {
      expect(Object.keys(INTERVALS)).toHaveLength(13);
      expect(INTERVALS[0]).toBeDefined();
      expect(INTERVALS[12]).toBeDefined();
    });

    it('should have correct interval names', () => {
      expect(INTERVALS[0]).toBe('Unison');
      expect(INTERVALS[5]).toBe('Perfect 4th');
      expect(INTERVALS[7]).toBe('Perfect 5th');
      expect(INTERVALS[12]).toBe('Octave');
    });

    it('should differentiate major and minor intervals', () => {
      expect(INTERVALS[1]).toBe('Minor 2nd');
      expect(INTERVALS[2]).toBe('Major 2nd');
      expect(INTERVALS[3]).toBe('Minor 3rd');
      expect(INTERVALS[4]).toBe('Major 3rd');
    });

    it('should include augmented 4th (tritone)', () => {
      expect(INTERVALS[6]).toBe('Augmented 4th');
    });

    it('should have values for all semitone steps', () => {
      for (let i = 0; i <= 12; i++) {
        expect(INTERVALS[i]).toBeDefined();
        expect(typeof INTERVALS[i]).toBe('string');
      }
    });
  });

  describe('KEY_SIGNATURES', () => {
    it('should contain 15 major key signatures', () => {
      expect(Object.keys(KEY_SIGNATURES)).toHaveLength(15);
    });

    it('should include C major with no sharps or flats', () => {
      expect(KEY_SIGNATURES['C']).toBe('No sharps or flats');
    });

    it('should include sharp keys', () => {
      expect(KEY_SIGNATURES['G']).toBe('1 sharp');
      expect(KEY_SIGNATURES['D']).toBe('2 sharps');
      expect(KEY_SIGNATURES['A']).toBe('3 sharps');
      expect(KEY_SIGNATURES['E']).toBe('4 sharps');
      expect(KEY_SIGNATURES['B']).toBe('5 sharps');
      expect(KEY_SIGNATURES['F♯']).toBe('6 sharps');
      expect(KEY_SIGNATURES['C♯']).toBe('7 sharps');
    });

    it('should include flat keys', () => {
      expect(KEY_SIGNATURES['F']).toBe('1 flat');
      expect(KEY_SIGNATURES['B♭']).toBe('2 flats');
      expect(KEY_SIGNATURES['E♭']).toBe('3 flats');
      expect(KEY_SIGNATURES['A♭']).toBe('4 flats');
      expect(KEY_SIGNATURES['D♭']).toBe('5 flats');
      expect(KEY_SIGNATURES['G♭']).toBe('6 flats');
      expect(KEY_SIGNATURES['C♭']).toBe('7 flats');
    });

    it('should have consistent description format', () => {
      Object.values(KEY_SIGNATURES).forEach(description => {
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
      });
    });

    it('should not have undefined keys', () => {
      Object.entries(KEY_SIGNATURES).forEach(([key, value]) => {
        expect(key).toBeDefined();
        expect(value).toBeDefined();
      });
    });
  });

  describe('Major Keys', () => {
    describe('Key Signatures', () => {
      it('should have correct details for C Major', () => {
        expect(MajorKey.C.getName()).toBe('C');
        expect(MajorKey.C.getKeySignature()).toBe('');
        expect(MajorKey.C.getRelativeMinor()).toBe('A');
      });

      it('should have correct details for G Major', () => {
        expect(MajorKey.G.getName()).toBe('G');
        expect(MajorKey.G.getEnharmonicName()).toBe('G');
        expect(MajorKey.G.getKeySignature()).toBe('1♯');
        expect(MajorKey.G.getRelativeMinor()).toBe('E');
      });

      it('should have correct details for D Major', () => {
        expect(MajorKey.D.getName()).toBe('D');
        expect(MajorKey.D.getEnharmonicName()).toBe('D');
        expect(MajorKey.D.getKeySignature()).toBe('2♯');
        expect(MajorKey.D.getRelativeMinor()).toBe('B');
      });

      it('should have correct details for A Major', () => {
        expect(MajorKey.A.getName()).toBe('A');
        expect(MajorKey.A.getEnharmonicName()).toBe('A');
        expect(MajorKey.A.getKeySignature()).toBe('3♯');
        expect(MajorKey.A.getRelativeMinor()).toBe('F♯');
      });

      it('should have correct details for E Major', () => {
        expect(MajorKey.E.getName()).toBe('E');
        expect(MajorKey.E.getEnharmonicName()).toBe('E');
        expect(MajorKey.E.getKeySignature()).toBe('4♯');
        expect(MajorKey.E.getRelativeMinor()).toBe('C♯');
      });

      it('should have correct details for B Major', () => {
        expect(MajorKey.B.getName()).toBe('B');
        expect(MajorKey.B.getEnharmonicName()).toBe('B');
        expect(MajorKey.B.getKeySignature()).toBe('5♯');
        expect(MajorKey.B.getRelativeMinor()).toBe('G♯');
      });

      it('should have correct details for F♯ Major', () => {
        expect(MajorKey.F_SHARP.getName()).toBe('F♯');
        expect(MajorKey.F_SHARP.getEnharmonicName()).toBe('F♯');
        expect(MajorKey.F_SHARP.getKeySignature()).toBe('6♯');
        expect(MajorKey.F_SHARP.getRelativeMinor()).toBe('D♯');
      });

      it('should have correct details for C♯ Major', () => {
        expect(MajorKey.C_SHARP.getName()).toBe('C♯');
        expect(MajorKey.C_SHARP.getEnharmonicName()).toBe('C♯/D♭');
        expect(MajorKey.C_SHARP.getKeySignature()).toBe('7♯');
        expect(MajorKey.C_SHARP.getRelativeMinor()).toBe('A♯');
      });

      it('should have correct details for F Major', () => {
        expect(MajorKey.F.getName()).toBe('F');
        expect(MajorKey.F.getEnharmonicName()).toBe('F');
        expect(MajorKey.F.getKeySignature()).toBe('1♭');
        expect(MajorKey.F.getRelativeMinor()).toBe('D');
      });

      it('should have correct details for B♭ Major', () => {
        expect(MajorKey.B_FLAT.getName()).toBe('B♭');
        expect(MajorKey.B_FLAT.getEnharmonicName()).toBe('B♭/A♯');
        expect(MajorKey.B_FLAT.getKeySignature()).toBe('2♭');
        expect(MajorKey.B_FLAT.getRelativeMinor()).toBe('G');
      });

      it('should have correct details for E♭ Major', () => {
        expect(MajorKey.E_FLAT.getName()).toBe('E♭');
        expect(MajorKey.E_FLAT.getEnharmonicName()).toBe('E♭/D♯');
        expect(MajorKey.E_FLAT.getKeySignature()).toBe('3♭');
        expect(MajorKey.E_FLAT.getRelativeMinor()).toBe('C');
      });

      it('should have correct details for A♭ Major', () => {
        expect(MajorKey.A_FLAT.getName()).toBe('A♭');
        expect(MajorKey.A_FLAT.getEnharmonicName()).toBe('A♭/G♯');
        expect(MajorKey.A_FLAT.getKeySignature()).toBe('4♭');
        expect(MajorKey.A_FLAT.getRelativeMinor()).toBe('F');
      });

      it('should have correct details for D♭ Major', () => {
        expect(MajorKey.D_FLAT.getName()).toBe('D♭');
        expect(MajorKey.D_FLAT.getEnharmonicName()).toBe('D♭/C♯');
        expect(MajorKey.D_FLAT.getKeySignature()).toBe('5♭');
        expect(MajorKey.D_FLAT.getRelativeMinor()).toBe('B♭');
      });

      it('should have correct details for G♭ Major', () => {
        expect(MajorKey.G_FLAT.getName()).toBe('G♭');
        expect(MajorKey.G_FLAT.getEnharmonicName()).toBe('G♭');
        expect(MajorKey.G_FLAT.getKeySignature()).toBe('6♭');
        expect(MajorKey.G_FLAT.getRelativeMinor()).toBe('E♭');
      });

      it('should have correct details for C♭ Major', () => {
        expect(MajorKey.C_FLAT.getName()).toBe('C♭');
        expect(MajorKey.C_FLAT.getEnharmonicName()).toBe('C♭');
        expect(MajorKey.C_FLAT.getKeySignature()).toBe('7♭');
        expect(MajorKey.C_FLAT.getRelativeMinor()).toBe('A♭');
      });
    });

    describe('Major keys functions',() => {
      it('should return an array of chromatic notes', () => {
        const chromatics: string[] = MajorKey.getFullChromatics();
        expect(chromatics.length).toBe(12);
        expect(chromatics[0]).toBe('C');
        expect(chromatics[1]).toBe('C♯/D♭');
        expect(chromatics[2]).toBe('D');
        expect(chromatics[3]).toBe('E♭/D♯');
        expect(chromatics[4]).toBe('E');
        expect(chromatics[5]).toBe('F');
        expect(chromatics[6]).toBe('F♯');
        expect(chromatics[7]).toBe('G');
        expect(chromatics[8]).toBe('A♭/G♯');
        expect(chromatics[9]).toBe('A');
        expect(chromatics[10]).toBe('B♭/A♯');
        expect(chromatics[11]).toBe('B');
      });

      it('should return a record of key names and key signatures', () => {
        const keySignatures: Record<string, string> = MajorKey.getKeySignatures();
        // expect(keySignatures.length).toBe(15);
        expect(keySignatures['C']).toBe('No ♯ or ♭');
        expect(keySignatures['G']).toBe('1♯');
        expect(keySignatures['D']).toBe('2♯');
        expect(keySignatures['A']).toBe('3♯');
        expect(keySignatures['E']).toBe('4♯');
        expect(keySignatures['B']).toBe('5♯');
        expect(keySignatures['F♯']).toBe('6♯');
        expect(keySignatures['C♯']).toBe('7♯');
        expect(keySignatures['F']).toBe('1♭');
        expect(keySignatures['B♭']).toBe('2♭');
        expect(keySignatures['E♭']).toBe('3♭');
        expect(keySignatures['A♭']).toBe('4♭');
        expect(keySignatures['D♭']).toBe('5♭');
        expect(keySignatures['G♭']).toBe('6♭');
        expect(keySignatures['C♭']).toBe('7♭');
      });
    });
  });
});
