import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Transpose from './Transpose';

describe('Transpose Component', () => {
  describe('Component Rendering', () => {
    it('should render the transposition form', () => {
      render(<Transpose />);
      expect(screen.getByText('Transposition')).toBeInTheDocument();
      expect(screen.getByLabelText(/source instrument key/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/target instrument key/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/source key signature/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/source note/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<Transpose />);
      const button = screen.getByRole('button', { name: /transpose/i });
      expect(button).toBeInTheDocument();
    });

    it('should have default values set', () => {
      render(<Transpose />);
      const sourceInstrument = screen.getByLabelText(/source instrument key/i) as HTMLSelectElement;
      const targetInstrument = screen.getByLabelText(/target instrument key/i) as HTMLSelectElement;
      const sourceKey = screen.getByLabelText(/source key signature/i) as HTMLSelectElement;
      const sourceNote = screen.getByLabelText(/source note/i) as HTMLSelectElement;

      expect(sourceInstrument.value).toBe('C');
      expect(targetInstrument.value).toBe('C');
      expect(sourceKey.value).toBe('-');
      expect(sourceNote.value).toBe('-');
    });

    it('should not show results panel initially', () => {
      render(<Transpose />);
      const resultPanel = screen.queryByText(/transposing/i);
      expect(resultPanel).not.toBeInTheDocument();
    });
  });

  describe('Instrument Selection', () => {
    it('should populate source instrument options', () => {
      render(<Transpose />);
      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const options = sourceInstrument.querySelectorAll('option');

      expect(options.length).toBe(8);
      expect(options[0]).toHaveValue('C');
    });

    it('should populate target instrument options', () => {
      render(<Transpose />);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const options = targetInstrument.querySelectorAll('option');

      expect(options.length).toBe(8);
    });

    it('should allow selecting different instruments', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      await user.selectOptions(sourceInstrument, 'B𝄬');

      expect((sourceInstrument as HTMLSelectElement).value).toBe('B𝄬');
    });
  });

  describe('Key Signature Selection', () => {
    it('should populate key signature options', () => {
      render(<Transpose />);
      const sourceKey = screen.getByLabelText(/source key signature/i);
      const options = sourceKey.querySelectorAll('option');

      // 1 default option + 15 key signatures
      expect(options.length).toBe(16);
    });

    it('should display key signatures with descriptions', () => {
      render(<Transpose />);
      expect(screen.getByText(/C \(no sharps or flats\)/i)).toBeInTheDocument();
      expect(screen.getByText(/G \(1 sharp\)/i)).toBeInTheDocument();
    });
  });

  describe('Note Selection', () => {
    it('should populate chromatic note options', () => {
      render(<Transpose />);
      const sourceNote = screen.getByLabelText(/source note/i);
      const options = sourceNote.querySelectorAll('option');

      // 1 default option + 12 chromatic notes
      expect(options.length).toBe(13);
    });

    it('should include all 12 chromatic notes', () => {
      render(<Transpose />);
      const sourceNote = screen.getByLabelText(/source note/i);

      expect(sourceNote).toHaveTextContent('C');
      expect(sourceNote).toHaveTextContent('C♯/D𝄬');
      expect(sourceNote).toHaveTextContent('B');
    });
  });

  describe('Transposition - Same Instrument (Unison)', () => {
    it('should show unison message when source and target instruments are the same', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceKey = screen.getByLabelText(/source key signature/i);
      await user.selectOptions(sourceKey, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/no transposition needed, keys are in unison/i)).toBeInTheDocument();
      });
    });

    it('should show unison for note transposition with same instruments', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'E');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/no transposition needed, keys are in unison/i)).toBeInTheDocument();
      });
    });
  });

  describe('Transposition - All key combinations', () => {
    describe.each([
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "C", expectedInterval: "down a major 2nd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "C♯/D𝄬", expectedInterval: "down a major 2nd", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "D", expectedInterval: "down a major 2nd", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "D♯/E𝄬", expectedInterval: "down a major 2nd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "E", expectedInterval: "down a major 2nd", expectedNote: "D" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "F", expectedInterval: "down a major 2nd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "F♯", expectedInterval: "down a major 2nd", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "G", expectedInterval: "down a major 2nd", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "G♯/A𝄬", expectedInterval: "down a major 2nd", expectedNote: "F♯" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "A", expectedInterval: "down a major 2nd", expectedNote: "G" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "A♯/B𝄬", expectedInterval: "down a major 2nd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "D", testSourceNote: "B", expectedInterval: "down a major 2nd", expectedNote: "A" },

      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "C", expectedInterval: "down a minor 3rd", expectedNote: "A" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "C♯/D𝄬", expectedInterval: "down a minor 3rd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "D", expectedInterval: "down a minor 3rd", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "D♯/E𝄬", expectedInterval: "down a minor 3rd", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "E", expectedInterval: "down a minor 3rd", expectedNote: "C♯" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "F", expectedInterval: "down a minor 3rd", expectedNote: "D" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "F♯", expectedInterval: "down a minor 3rd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "G", expectedInterval: "down a minor 3rd", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "G♯/A𝄬", expectedInterval: "down a minor 3rd", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "A", expectedInterval: "down a minor 3rd", expectedNote: "F♯" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "A♯/B𝄬", expectedInterval: "down a minor 3rd", expectedNote: "G" },
      { testSourceInstrument: "C", testTargetInstrument: "E𝄬", testSourceNote: "B", expectedInterval: "down a minor 3rd", expectedNote: "G♯" },

      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "C", expectedInterval: "down a major 3rd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "C♯/D𝄬", expectedInterval: "down a major 3rd", expectedNote: "A" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "D", expectedInterval: "down a major 3rd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "D♯/E𝄬", expectedInterval: "down a major 3rd", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "E", expectedInterval: "down a major 3rd", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "F", expectedInterval: "down a major 3rd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "F♯", expectedInterval: "down a major 3rd", expectedNote: "D" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "G", expectedInterval: "down a major 3rd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "G♯/A𝄬", expectedInterval: "down a major 3rd", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "A", expectedInterval: "down a major 3rd", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "A♯/B𝄬", expectedInterval: "down a major 3rd", expectedNote: "F♯" },
      { testSourceInstrument: "C", testTargetInstrument: "E", testSourceNote: "B", expectedInterval: "down a major 3rd", expectedNote: "G" },

      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "C", expectedInterval: "down a perfect 4th", expectedNote: "G" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "C♯/D𝄬", expectedInterval: "down a perfect 4th", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "D", expectedInterval: "down a perfect 4th", expectedNote: "A" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "D♯/E𝄬", expectedInterval: "down a perfect 4th", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "E", expectedInterval: "down a perfect 4th", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "F", expectedInterval: "down a perfect 4th", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "F♯", expectedInterval: "down a perfect 4th", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "G", expectedInterval: "down a perfect 4th", expectedNote: "D" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "G♯/A𝄬", expectedInterval: "down a perfect 4th", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "A", expectedInterval: "down a perfect 4th", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "A♯/B𝄬", expectedInterval: "down a perfect 4th", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "F", testSourceNote: "B", expectedInterval: "down a perfect 4th", expectedNote: "F♯" },

      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "C", expectedInterval: "up a minor 3rd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "C♯/D𝄬", expectedInterval: "up a minor 3rd", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "D", expectedInterval: "up a minor 3rd", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "D♯/E𝄬", expectedInterval: "up a minor 3rd", expectedNote: "F♯" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "E", expectedInterval: "up a minor 3rd", expectedNote: "G" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "F", expectedInterval: "up a minor 3rd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "F♯", expectedInterval: "up a minor 3rd", expectedNote: "A" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "G", expectedInterval: "up a minor 3rd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "G♯/A𝄬", expectedInterval: "up a minor 3rd", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "A", expectedInterval: "up a minor 3rd", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "A♯/B𝄬", expectedInterval: "up a minor 3rd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "A", testSourceNote: "B", expectedInterval: "up a minor 3rd", expectedNote: "D" },

      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "C", expectedInterval: "up a major 2nd", expectedNote: "D" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "C♯/D𝄬", expectedInterval: "up a major 2nd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "D", expectedInterval: "up a major 2nd", expectedNote: "E" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "D♯/E𝄬", expectedInterval: "up a major 2nd", expectedNote: "F" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "E", expectedInterval: "up a major 2nd", expectedNote: "F♯" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "F", expectedInterval: "up a major 2nd", expectedNote: "G" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "F♯", expectedInterval: "up a major 2nd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "G", expectedInterval: "up a major 2nd", expectedNote: "A" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "G♯/A𝄬", expectedInterval: "up a major 2nd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "A", expectedInterval: "up a major 2nd", expectedNote: "B" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "A♯/B𝄬", expectedInterval: "up a major 2nd", expectedNote: "C" },
      { testSourceInstrument: "C", testTargetInstrument: "B𝄬", testSourceNote: "B", expectedInterval: "up a major 2nd", expectedNote: "C♯/D𝄬" },

      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "C", expectedInterval: "up a major 2nd", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "C♯/D𝄬", expectedInterval: "up a major 2nd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "D", expectedInterval: "up a major 2nd", expectedNote: "E" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "D♯/E𝄬", expectedInterval: "up a major 2nd", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "E", expectedInterval: "up a major 2nd", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "F", expectedInterval: "up a major 2nd", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "F♯", expectedInterval: "up a major 2nd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "G", expectedInterval: "up a major 2nd", expectedNote: "A" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "G♯/A𝄬", expectedInterval: "up a major 2nd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "A", expectedInterval: "up a major 2nd", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "A♯/B𝄬", expectedInterval: "up a major 2nd", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "C", testSourceNote: "B", expectedInterval: "up a major 2nd", expectedNote: "C♯/D𝄬" },

      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "C", expectedInterval: "down a minor 2nd", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "C♯/D𝄬", expectedInterval: "down a minor 2nd", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "D", expectedInterval: "down a minor 2nd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "D♯/E𝄬", expectedInterval: "down a minor 2nd", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "E", expectedInterval: "down a minor 2nd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "F", expectedInterval: "down a minor 2nd", expectedNote: "E" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "F♯", expectedInterval: "down a minor 2nd", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "G", expectedInterval: "down a minor 2nd", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "G♯/A𝄬", expectedInterval: "down a minor 2nd", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "A", expectedInterval: "down a minor 2nd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "A♯/B𝄬", expectedInterval: "down a minor 2nd", expectedNote: "A" },
      { testSourceInstrument: "D", testTargetInstrument: "E𝄬", testSourceNote: "B", expectedInterval: "down a minor 2nd", expectedNote: "A♯/B𝄬" },

      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "C", expectedInterval: "down a major 2nd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "C♯/D𝄬", expectedInterval: "down a major 2nd", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "D", expectedInterval: "down a major 2nd", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "D♯/E𝄬", expectedInterval: "down a major 2nd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "E", expectedInterval: "down a major 2nd", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "F", expectedInterval: "down a major 2nd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "F♯", expectedInterval: "down a major 2nd", expectedNote: "E" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "G", expectedInterval: "down a major 2nd", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "G♯/A𝄬", expectedInterval: "down a major 2nd", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "A", expectedInterval: "down a major 2nd", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "A♯/B𝄬", expectedInterval: "down a major 2nd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "E", testSourceNote: "B", expectedInterval: "down a major 2nd", expectedNote: "A" },

      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "C", expectedInterval: "down a minor 3rd", expectedNote: "A" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "C♯/D𝄬", expectedInterval: "down a minor 3rd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "D", expectedInterval: "down a minor 3rd", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "D♯/E𝄬", expectedInterval: "down a minor 3rd", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "E", expectedInterval: "down a minor 3rd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "F", expectedInterval: "down a minor 3rd", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "F♯", expectedInterval: "down a minor 3rd", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "G", expectedInterval: "down a minor 3rd", expectedNote: "E" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "G♯/A𝄬", expectedInterval: "down a minor 3rd", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "A", expectedInterval: "down a minor 3rd", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "A♯/B𝄬", expectedInterval: "down a minor 3rd", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "F", testSourceNote: "B", expectedInterval: "down a minor 3rd", expectedNote: "G♯/A𝄬" },

      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "C", expectedInterval: "up a perfect 4th", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "C♯/D𝄬", expectedInterval: "up a perfect 4th", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "D", expectedInterval: "up a perfect 4th", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "D♯/E𝄬", expectedInterval: "up a perfect 4th", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "E", expectedInterval: "up a perfect 4th", expectedNote: "A" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "F", expectedInterval: "up a perfect 4th", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "F♯", expectedInterval: "up a perfect 4th", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "G", expectedInterval: "up a perfect 4th", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "G♯/A𝄬", expectedInterval: "up a perfect 4th", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "A", expectedInterval: "up a perfect 4th", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "A♯/B𝄬", expectedInterval: "up a perfect 4th", expectedNote: "D♯/E𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "A", testSourceNote: "B", expectedInterval: "up a perfect 4th", expectedNote: "E" },

      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "C", expectedInterval: "up a major 3rd", expectedNote: "E" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "C♯/D𝄬", expectedInterval: "up a major 3rd", expectedNote: "F" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "D", expectedInterval: "up a major 3rd", expectedNote: "F♯" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "D♯/E𝄬", expectedInterval: "up a major 3rd", expectedNote: "G" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "E", expectedInterval: "up a major 3rd", expectedNote: "G♯/A𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "F", expectedInterval: "up a major 3rd", expectedNote: "A" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "F♯", expectedInterval: "up a major 3rd", expectedNote: "A♯/B𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "G", expectedInterval: "up a major 3rd", expectedNote: "B" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "G♯/A𝄬", expectedInterval: "up a major 3rd", expectedNote: "C" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "A", expectedInterval: "up a major 3rd", expectedNote: "C♯/D𝄬" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "A♯/B𝄬", expectedInterval: "up a major 3rd", expectedNote: "D" },
      { testSourceInstrument: "D", testTargetInstrument: "B𝄬", testSourceNote: "B", expectedInterval: "up a major 3rd", expectedNote: "D♯/E𝄬" },

    ])(`Transpose from instrument in $testSourceInstrument to instrument in $testTargetInstrument`, ({ testSourceInstrument, testTargetInstrument, testSourceNote, expectedInterval, expectedNote}) => {
      it(`should transpose from ${testSourceNote} ${expectedInterval} to ${expectedNote}`, async () => {
        const user = userEvent.setup();
        render(<Transpose />);

        const sourceInstrument = screen.getByLabelText(/source instrument key/i);
        const targetInstrument = screen.getByLabelText(/target instrument key/i);
        const sourceNote = screen.getByLabelText(/source note/i);

        await user.selectOptions(sourceInstrument, testSourceInstrument);
        await user.selectOptions(targetInstrument, testTargetInstrument);
        await user.selectOptions(sourceNote, testSourceNote);

        const submitButton = screen.getByRole('button', { name: /transpose/i });
        await user.click(submitButton);

        await waitFor(() => {
          expect(screen.getByText(new RegExp(`transposing ${expectedInterval}`, 'i'))).toBeInTheDocument();
          expect(screen.getByText(new RegExp(`transposed note:.*${expectedNote}`, 'i'))).toBeInTheDocument();
        });
      })
    });
  });

  describe('Transposition - Different Instruments', () => {
    it('should transpose from C to B♭ instrument (up a Major 2nd)', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'B𝄬');
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing up a major 2nd/i)).toBeInTheDocument();
        expect(screen.getByText(/transposed note: D/i)).toBeInTheDocument();
      });
    });

    it('should transpose from B♭ to C instrument (down a Major 2nd)', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'B𝄬');
      await user.selectOptions(targetInstrument, 'C');
      await user.selectOptions(sourceNote, 'D');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing down a major 2nd/i)).toBeInTheDocument();
        expect(screen.getByText(/transposed note: C/i)).toBeInTheDocument();
      });
    });

    it('should transpose from C to E♭ instrument (up a Minor 3rd)', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'E𝄬');
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing up a minor 3rd/i)).toBeInTheDocument();
      });
    });
  });

  describe('Key Signature Transposition', () => {
    it('should transpose key signature from C to B♭', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceKey = screen.getByLabelText(/source key signature/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'B𝄬');
      await user.selectOptions(sourceKey, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing up a major 2nd/i)).toBeInTheDocument();
        expect(screen.getByText(/transposed key signature: D/i)).toBeInTheDocument();
      });
    });

    it('should hide key signature result when not selected', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        const keyResult = screen.queryByText(/transposed key signature/i);
        expect(keyResult).not.toBeInTheDocument();
      });
    });
  });

  describe('Clear Values Functionality', () => {
    it('should clear results when changing source instrument', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      // First, perform a transposition
      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/no transposition needed/i)).toBeInTheDocument();
      });

      // Change source instrument
      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      await user.selectOptions(sourceInstrument, 'B𝄬');

      // Results should be cleared (panel becomes hidden)
      const resultPanel = screen.queryByText(/no transposition needed/i);
      expect(resultPanel).not.toBeInTheDocument();
    });

    it('should clear results when changing target instrument', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/no transposition needed/i)).toBeInTheDocument();
      });

      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      await user.selectOptions(targetInstrument, 'E𝄬');

      const resultPanel = screen.queryByText(/no transposition needed/i);
      expect(resultPanel).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle enharmonic notes correctly', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'C♯/D𝄬');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        const result = screen.getByText(/transposed note/i);
        expect(result).toBeInTheDocument();
      });
    });

    it('should handle transposition across octave boundaries', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'A');
      await user.selectOptions(sourceNote, 'B');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposed note/i)).toBeInTheDocument();
      });
    });

    it('should handle both key and note transposition simultaneously', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceKey = screen.getByLabelText(/source key signature/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'B𝄬');
      await user.selectOptions(sourceKey, 'G');
      await user.selectOptions(sourceNote, 'A');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposed key signature/i)).toBeInTheDocument();
        expect(screen.getByText(/transposed note/i)).toBeInTheDocument();
      });
    });

    it('should not crash when submitting with default values', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      // Should show unison message
      await waitFor(() => {
        expect(screen.getByText(/no transposition needed/i)).toBeInTheDocument();
      });
    });
  });

  describe('Result Panel Visibility', () => {
    it('should show result panel only after transposition', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      // Panel should not exist initially
      let panels = document.querySelectorAll('.panel');
      expect(panels.length).toBe(1);

      // Perform transposition
      const sourceNote = screen.getByLabelText(/source note/i);
      await user.selectOptions(sourceNote, 'E');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      // Panel should be visible
      await waitFor(() => {
        panels = document.querySelectorAll('.panel');
        expect(panels.length).toBe(2);
      });
    });

    it('should display interval direction correctly for upward transposition', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'C');
      await user.selectOptions(targetInstrument, 'B𝄬');
      await user.selectOptions(sourceNote, 'C');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing up/i)).toBeInTheDocument();
      });
    });

    it('should display interval direction correctly for downward transposition', async () => {
      const user = userEvent.setup();
      render(<Transpose />);

      const sourceInstrument = screen.getByLabelText(/source instrument key/i);
      const targetInstrument = screen.getByLabelText(/target instrument key/i);
      const sourceNote = screen.getByLabelText(/source note/i);

      await user.selectOptions(sourceInstrument, 'B𝄬');
      await user.selectOptions(targetInstrument, 'C');
      await user.selectOptions(sourceNote, 'D');

      const submitButton = screen.getByRole('button', { name: /transpose/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/transposing down/i)).toBeInTheDocument();
      });
    });
  });
});
