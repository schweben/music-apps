import { describe, it, expect } from 'vitest';
import { TRANSPOSING_INSTRUMENTS, CHROMATIC, INTERVALS, KEY_SIGNATURES } from './Keys';

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
});
