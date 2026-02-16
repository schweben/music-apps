import { describe, it, expect } from 'vitest';
import {
  Scale,
  MAJOR_SCALES,
  HARMONIC_MINOR_SCALES,
  MELODIC_MINOR_SCALES,
  CHROMATIC_SCALES,
  PENTATONIC_SCALES,
  DOMINANT_7TH_SCALES,
  DIMINISHED_7TH_SCALES,
} from './Scales';
import { MajorKey } from './Keys';

describe('Scale Class', () => {
  describe('Constructor and Getters', () => {
    it('should create a scale with all parameters', () => {
      const scale = new Scale('C Major', '2 octaves', 0, 0);
      expect(scale.getName()).toBe('C Major');
      expect(scale.getRange()).toBe('2 octaves');
    });

    it('should create a scale without sharps/flats parameters', () => {
      const scale = new Scale('Chromatic scale starting on C', '2 octaves');
      expect(scale.getName()).toBe('Chromatic scale starting on C');
      expect(scale.getRange()).toBe('2 octaves');
      expect(scale.getKey()).toBeNull();
    });

    it('should create scales with different ranges', () => {
      const twoOctave = new Scale('Test Scale', '2 octaves', 1, 0);
      const twelfth = new Scale('Test Scale 2', '12th', 0, 2);
      expect(twoOctave.getRange()).toBe('2 octaves');
      expect(twelfth.getRange()).toBe('12th');
    });
  });

  describe('getKey method', () => {
    it('should return null when sharps and flats are undefined', () => {
      const scale = new Scale('Chromatic', '2 octaves');
      expect(scale.getKey()).toBeNull();
    });

    it('should return "No sharps or flats" for C major', () => {
      const scale = new Scale('C Major', '2 octaves', MajorKey.C);
      expect(scale.getKey()).toBe('No ♯ or ♭');
    });

    it('should return singular form for 1 sharp', () => {
      const scale = new Scale('G Major', '12th', MajorKey.G);
      expect(scale.getKey()).toBe('1♯');
    });

    it('should return plural form for multiple sharps', () => {
      const twoSharps = new Scale('D Major', '12th', MajorKey.D);
      const threeSharps = new Scale('A Major', '2 octaves', MajorKey.A);
      expect(twoSharps.getKey()).toBe('2♯');
      expect(threeSharps.getKey()).toBe('3♯');
    });

    it('should return singular form for 1 flat', () => {
      const scale = new Scale('F Major', '12th', MajorKey.F);
      expect(scale.getKey()).toBe('1♭');
    });

    it('should return plural form for multiple flats', () => {
      const twoFlats = new Scale('Bb Major', '2 octaves', MajorKey.B_FLAT);
      const threeFlats = new Scale('Eb Major', '12th', MajorKey.E_FLAT);
      expect(twoFlats.getKey()).toBe('2♭');
      expect(threeFlats.getKey()).toBe('3♭');
    });

    it('should handle maximum sharps (7)', () => {
      const scale = new Scale('C# Major', '2 octaves', MajorKey.C_SHARP);
      expect(scale.getKey()).toBe('7♯');
    });

    it('should handle maximum flats (7)', () => {
      const scale = new Scale('Cb Major', '2 octaves', MajorKey.C_FLAT);
      expect(scale.getKey()).toBe('7♭');
    });
  });
});

describe('MAJOR_SCALES', () => {
  it('should contain 13 major scales', () => {
    expect(MAJOR_SCALES).toHaveLength(13);
  });

  it('should all be Scale instances', () => {
    MAJOR_SCALES.forEach(scale => {
      expect(scale).toBeInstanceOf(Scale);
    });
  });

  it('should include C Major', () => {
    const cMajor = MAJOR_SCALES.find(s => s.getName() === 'C Major');
    expect(cMajor).toBeDefined();
    expect(cMajor?.getKey()).toBe('No ♯ or ♭');
  });

  it('should have valid ranges', () => {
    MAJOR_SCALES.forEach(scale => {
      const range = scale.getRange();
      expect(['2 octaves', '12th']).toContain(range);
    });
  });

  it('should not have any scales returning null key', () => {
    MAJOR_SCALES.forEach(scale => {
      expect(scale.getKey()).not.toBeNull();
    });
  });

  it('should contain all 7 sharp keys', () => {
    const sharpKeys = MAJOR_SCALES.filter(s => s.getKey()?.includes('♯'));
    expect(sharpKeys.length).toBeGreaterThanOrEqual(6);
  });

  it('should contain all 6 flat keys', () => {
    const flatKeys = MAJOR_SCALES.filter(s => s.getKey()?.includes('♭'));
    expect(flatKeys.length).toBeGreaterThanOrEqual(5);
  });
});

describe('HARMONIC_MINOR_SCALES', () => {
  it('should contain 13 harmonic minor scales', () => {
    expect(HARMONIC_MINOR_SCALES).toHaveLength(13);
  });

  it('should all contain "Harmonic Minor" in name', () => {
    HARMONIC_MINOR_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Harmonic Minor');
    });
  });

  it('should all have valid key signatures', () => {
    HARMONIC_MINOR_SCALES.forEach(scale => {
      expect(scale.getKey()).not.toBeNull();
    });
  });

  it('should include A Harmonic Minor with no sharps or flats', () => {
    const aMin = HARMONIC_MINOR_SCALES.find(s => s.getName() === 'A Harmonic Minor');
    expect(aMin).toBeDefined();
    expect(aMin?.getKey()).toBe('No ♯ or ♭');
  });
});

describe('MELODIC_MINOR_SCALES', () => {
  it('should contain 13 melodic minor scales', () => {
    expect(MELODIC_MINOR_SCALES).toHaveLength(13);
  });

  it('should all contain "Melodic Minor" in name', () => {
    MELODIC_MINOR_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Melodic Minor');
    });
  });

  it('should have same count as harmonic minor scales', () => {
    expect(MELODIC_MINOR_SCALES.length).toBe(HARMONIC_MINOR_SCALES.length);
  });

  it('should all have valid key signatures', () => {
    MELODIC_MINOR_SCALES.forEach(scale => {
      expect(scale.getKey()).not.toBeNull();
    });
  });
});

describe('CHROMATIC_SCALES', () => {
  it('should contain 7 chromatic scales', () => {
    expect(CHROMATIC_SCALES).toHaveLength(7);
  });

  it('should all contain "Chromatic scale" in name', () => {
    CHROMATIC_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Chromatic scale');
    });
  });

  it('should all return null for getKey()', () => {
    CHROMATIC_SCALES.forEach(scale => {
      expect(scale.getKey()).toBeNull();
    });
  });

  it('should all be 2 octaves range', () => {
    CHROMATIC_SCALES.forEach(scale => {
      expect(scale.getRange()).toBe('2 octaves');
    });
  });

  it('should have different starting notes', () => {
    const names = CHROMATIC_SCALES.map(s => s.getName());
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(CHROMATIC_SCALES.length);
  });
});

describe('PENTATONIC_SCALES', () => {
  it('should contain 13 pentatonic scales', () => {
    expect(PENTATONIC_SCALES).toHaveLength(13);
  });

  it('should all contain "Pentatonic" in name', () => {
    PENTATONIC_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Pentatonic');
    });
  });

  it('should all have valid key signatures', () => {
    PENTATONIC_SCALES.forEach(scale => {
      expect(scale.getKey()).not.toBeNull();
    });
  });

  it('should include C Pentatonic', () => {
    const cPent = PENTATONIC_SCALES.find(s => s.getName() === 'C Pentatonic');
    expect(cPent).toBeDefined();
  });
});

describe('DOMINANT_7TH_SCALES', () => {
  it('should contain 12 dominant 7th scales', () => {
    expect(DOMINANT_7TH_SCALES).toHaveLength(12);
  });

  it('should all contain "Dominant 7th" in name', () => {
    DOMINANT_7TH_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Dominant 7th');
    });
  });

  it('should all have valid key signatures', () => {
    DOMINANT_7TH_SCALES.forEach(scale => {
      expect(scale.getKey()).not.toBeNull();
    });
  });

  it('should include various keys', () => {
    const names = DOMINANT_7TH_SCALES.map(s => s.getName());
    expect(names.some(n => n.includes('key of C'))).toBe(true);
    expect(names.some(n => n.includes('key of G'))).toBe(true);
  });
});

describe('DIMINISHED_7TH_SCALES', () => {
  it('should contain 7 diminished 7th scales', () => {
    expect(DIMINISHED_7TH_SCALES).toHaveLength(7);
  });

  it('should all contain "Diminshed 7th" in name', () => {
    DIMINISHED_7TH_SCALES.forEach(scale => {
      expect(scale.getName()).toContain('Diminshed 7th');
    });
  });

  it('should all return null for getKey()', () => {
    DIMINISHED_7TH_SCALES.forEach(scale => {
      expect(scale.getKey()).toBeNull();
    });
  });

  it('should all be 2 octaves range', () => {
    DIMINISHED_7TH_SCALES.forEach(scale => {
      expect(scale.getRange()).toBe('2 octaves');
    });
  });

  it('should have different starting notes', () => {
    const names = DIMINISHED_7TH_SCALES.map(s => s.getName());
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(DIMINISHED_7TH_SCALES.length);
  });
});

describe('Scale Collections Integration', () => {
  it('should have no duplicate scale names across all collections', () => {
    const allScales = [
      ...MAJOR_SCALES,
      ...HARMONIC_MINOR_SCALES,
      ...MELODIC_MINOR_SCALES,
      ...CHROMATIC_SCALES,
      ...PENTATONIC_SCALES,
      ...DOMINANT_7TH_SCALES,
      ...DIMINISHED_7TH_SCALES,
    ];

    const names = allScales.map(s => s.getName());
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('should have a total of 78 scales', () => {
    const total =
      MAJOR_SCALES.length +
      HARMONIC_MINOR_SCALES.length +
      MELODIC_MINOR_SCALES.length +
      CHROMATIC_SCALES.length +
      PENTATONIC_SCALES.length +
      DOMINANT_7TH_SCALES.length +
      DIMINISHED_7TH_SCALES.length;
    expect(total).toBe(78);
  });
});
