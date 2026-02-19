import { describe, it, expect } from 'vitest';
import { MajorKey } from './Keys';
import { INTERVALS, TRANSPOSING_INSTRUMENTS } from './musicConstants';

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

  describe('Major Keys', () => {
    describe('Key Signatures', () => {
      it('should have correct details for C Major', () => {
        expect(MajorKey.C.getName()).toBe('C');
        expect(MajorKey.C.getKeySignature()).toBe('No ♯ or ♭');
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
        expect(Object.keys(keySignatures).length).toBe(15);
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

      it('should return the key signature for a given key name', () => {
        expect(MajorKey.getKeySignature('C')).toBe('No ♯ or ♭');
        expect(MajorKey.getKeySignature('G')).toBe('1♯');
        expect(MajorKey.getKeySignature('D')).toBe('2♯');
        expect(MajorKey.getKeySignature('A')).toBe('3♯');
        expect(MajorKey.getKeySignature('E')).toBe('4♯');
        expect(MajorKey.getKeySignature('B')).toBe('5♯');
        expect(MajorKey.getKeySignature('F♯')).toBe('6♯');
        expect(MajorKey.getKeySignature('C♯')).toBe('7♯');
        expect(MajorKey.getKeySignature('F')).toBe('1♭');
        expect(MajorKey.getKeySignature('B♭')).toBe('2♭');
        expect(MajorKey.getKeySignature('E♭')).toBe('3♭');
        expect(MajorKey.getKeySignature('A♭')).toBe('4♭');
        expect(MajorKey.getKeySignature('D♭')).toBe('5♭');
        expect(MajorKey.getKeySignature('G♭')).toBe('6♭');
        expect(MajorKey.getKeySignature('C♭')).toBe('7♭');
      });

      it('should return a list of major keys', () => {
        const majorKeys: string[] = MajorKey.getMajorKeys();
        expect(majorKeys.length).toBe(12);
        expect(majorKeys[0]).toBe('G');
        expect(majorKeys[1]).toBe('D');
        expect(majorKeys[2]).toBe('A');
        expect(majorKeys[3]).toBe('E');
        expect(majorKeys[4]).toBe('B');
        expect(majorKeys[5]).toBe('F♯');
        expect(majorKeys[6]).toBe('D♭');
        expect(majorKeys[7]).toBe('A♭');
        expect(majorKeys[8]).toBe('E♭');
        expect(majorKeys[9]).toBe('B♭');
        expect(majorKeys[10]).toBe('F');
        expect(majorKeys[11]).toBe('C');
      });

      it('should return a list of minor keys', () => {
        const minorKeys: string[] = MajorKey.getMinorKeys();
        expect(minorKeys.length).toBe(12);
        expect(minorKeys[0]).toBe('E');
        expect(minorKeys[1]).toBe('B');
        expect(minorKeys[2]).toBe('F♯');
        expect(minorKeys[3]).toBe('C♯');
        expect(minorKeys[4]).toBe('G♯');
        expect(minorKeys[5]).toBe('D♯');
        expect(minorKeys[6]).toBe('B♭');
        expect(minorKeys[7]).toBe('F');
        expect(minorKeys[8]).toBe('C');
        expect(minorKeys[9]).toBe('G');
        expect(minorKeys[10]).toBe('D');
        expect(minorKeys[11]).toBe('A');
      });

      it('should return enharmonic key signatures where necessary', () => {
        expect(MajorKey.getDualKeySignature('C')).toBe('No ♯ or ♭');
        expect(MajorKey.getDualKeySignature('G')).toBe('1♯');
        expect(MajorKey.getDualKeySignature('D')).toBe('2♯');
        expect(MajorKey.getDualKeySignature('A')).toBe('3♯');
        expect(MajorKey.getDualKeySignature('E')).toBe('4♯');
        expect(MajorKey.getDualKeySignature('B/C♭')).toBe('5♯/7♭');
        expect(MajorKey.getDualKeySignature('B')).toBe('5♯');
        expect(MajorKey.getDualKeySignature('C♭')).toBe('7♭');
        expect(MajorKey.getDualKeySignature('F♯/G♭')).toBe('6♯/6♭');
        expect(MajorKey.getDualKeySignature('F♯')).toBe('6♯');
        expect(MajorKey.getDualKeySignature('G♭')).toBe('6♭');
        expect(MajorKey.getDualKeySignature('D♭/C♯')).toBe('5♭/7♯');
        expect(MajorKey.getDualKeySignature('D♭')).toBe('5♭');
        expect(MajorKey.getDualKeySignature('C♯')).toBe('7♯');
        expect(MajorKey.getDualKeySignature('A♭')).toBe('4♭');
        expect(MajorKey.getDualKeySignature('E♭')).toBe('3♭');
        expect(MajorKey.getDualKeySignature('B♭')).toBe('2♭');
        expect(MajorKey.getDualKeySignature('F')).toBe('1♭');
      });
    });
  });
});
