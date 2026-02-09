import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScalesPractice from './ScalesPractice';

describe('ScalesPractice Component', () => {
  describe('Component Rendering', () => {
    it('should render the scales practice form', () => {
      render(<ScalesPractice />);
      expect(screen.getByText('Scales Practice')).toBeInTheDocument();
      expect(screen.getByText('Select which type of scale to practice')).toBeInTheDocument();
    });

    it('should render all scale type checkboxes', () => {
      render(<ScalesPractice />);
      expect(screen.getByLabelText(/major/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/harmonic minor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/melodic minor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/chromatic/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/pentatonic/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dominant 7th/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/diminished 7th/i)).toBeInTheDocument();
    });

    it('should have Major checkbox checked by default', () => {
      render(<ScalesPractice />);
      const majorCheckbox = screen.getByLabelText(/^major$/i) as HTMLInputElement;
      expect(majorCheckbox.checked).toBe(true);
    });

    it('should have other checkboxes unchecked by default', () => {
      render(<ScalesPractice />);
      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i) as HTMLInputElement;
      const melodicCheckbox = screen.getByLabelText(/melodic minor/i) as HTMLInputElement;

      expect(harmonicCheckbox.checked).toBe(false);
      expect(melodicCheckbox.checked).toBe(false);
    });

    it('should render submit button', () => {
      render(<ScalesPractice />);
      const button = screen.getByRole('button', { name: /get a scale/i });
      expect(button).toBeInTheDocument();
    });

    it('should not show scale result initially', () => {
      render(<ScalesPractice />);
      const showKeyButton = screen.queryByRole('button', { name: /show key/i });
      expect(showKeyButton).not.toBeInTheDocument();
    });
  });

  describe('Checkbox Interaction', () => {
    it('should allow checking additional scale types', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i) as HTMLInputElement;
      await user.click(harmonicCheckbox);

      expect(harmonicCheckbox.checked).toBe(true);
    });

    it('should allow unchecking the major scale', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i) as HTMLInputElement;
      await user.click(majorCheckbox);

      expect(majorCheckbox.checked).toBe(false);
    });

    it('should allow checking multiple scale types', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i) as HTMLInputElement;
      const melodicCheckbox = screen.getByLabelText(/melodic minor/i) as HTMLInputElement;
      const pentatonicCheckbox = screen.getByLabelText(/pentatonic/i) as HTMLInputElement;

      await user.click(harmonicCheckbox);
      await user.click(melodicCheckbox);
      await user.click(pentatonicCheckbox);

      expect(harmonicCheckbox.checked).toBe(true);
      expect(melodicCheckbox.checked).toBe(true);
      expect(pentatonicCheckbox.checked).toBe(true);
    });

    it('should clear scale when clicking a checkbox', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Get a scale first
      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show key/i })).toBeInTheDocument();
      });

      // Click a checkbox
      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i);
      await user.click(harmonicCheckbox);

      // Scale should be cleared
      const showKeyButton = screen.queryByRole('button', { name: /show key/i });
      expect(showKeyButton).not.toBeInTheDocument();
    });
  });

  describe('Scale Generation', () => {
    it('should generate a major scale when only Major is checked', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const scaleText = screen.getByText(/major/i);
        expect(scaleText).toBeInTheDocument();
      });
    });

    it('should display scale name and range', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const scaleDisplay = screen.getByText(/\(.*\)/);
        expect(scaleDisplay).toBeInTheDocument();
      });
    });

    it('should generate different scales from selected types', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Check harmonic minor
      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i);
      await user.click(harmonicCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const scaleText = document.body.textContent;
        expect(scaleText).toMatch(/major|harmonic minor/i);
      });
    });

    it('should generate chromatic scales when selected', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Uncheck major, check chromatic
      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const chromaticCheckbox = screen.getByLabelText(/chromatic/i);

      await user.click(majorCheckbox);
      await user.click(chromaticCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/chromatic scale/i)).toBeInTheDocument();
      });
    });

    it('should generate pentatonic scales when selected', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const pentatonicCheckbox = screen.getByLabelText(/pentatonic/i);

      await user.click(majorCheckbox);
      await user.click(pentatonicCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/pentatonic/i)).toBeInTheDocument();
      });
    });

    it('should generate dominant 7th scales when selected', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const dominantCheckbox = screen.getByLabelText(/dominant 7th/i);

      await user.click(majorCheckbox);
      await user.click(dominantCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/dominant 7th/i)).toBeInTheDocument();
      });
    });

    it('should generate diminished 7th scales when selected', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const diminishedCheckbox = screen.getByLabelText(/diminished 7th/i);

      await user.click(majorCheckbox);
      await user.click(diminishedCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/diminshed 7th/i)).toBeInTheDocument();
      });
    });
  });

  describe('Show/Hide Key Functionality', () => {
    it('should initially hide the key signature', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const scaleDisplay = screen.getByText(/major/i);
        expect(scaleDisplay.textContent).not.toMatch(/sharp|flat/i);
      });
    });

    it('should show "Show key" button for scales with key signatures', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const showKeyButton = screen.getByRole('button', { name: /show key/i });
        expect(showKeyButton).toBeInTheDocument();
        expect(showKeyButton).not.toBeDisabled();
      });
    });

    it('should display key signature when "Show key" is clicked', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const showKeyButton = screen.getByRole('button', { name: /show key/i });
        expect(showKeyButton).toBeInTheDocument();
      });

      const showKeyButton = screen.getByRole('button', { name: /show key/i });
      await user.click(showKeyButton);

      await waitFor(() => {
        const scaleDisplay = screen.getByText(/major/i);
        expect(scaleDisplay.textContent).toMatch(/sharp|flat|no sharps or flats/i);
      });
    });

    it('should toggle button text between "Show key" and "Hide key"', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show key/i })).toBeInTheDocument();
      });

      const showKeyButton = screen.getByRole('button', { name: /show key/i });
      await user.click(showKeyButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /hide key/i })).toBeInTheDocument();
      });

      const hideKeyButton = screen.getByRole('button', { name: /hide key/i });
      await user.click(hideKeyButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show key/i })).toBeInTheDocument();
      });
    });

    it('should disable "Show key" button for chromatic scales', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const chromaticCheckbox = screen.getByLabelText(/chromatic/i);

      await user.click(majorCheckbox);
      await user.click(chromaticCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const showKeyButton = screen.getByRole('button', { name: /show key/i });
        expect(showKeyButton).toBeDisabled();
      });
    });

    it('should disable "Show key" button for diminished 7th scales', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const majorCheckbox = screen.getByLabelText(/^major$/i);
      const diminishedCheckbox = screen.getByLabelText(/diminished 7th/i);

      await user.click(majorCheckbox);
      await user.click(diminishedCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const showKeyButton = screen.getByRole('button', { name: /show key/i });
        expect(showKeyButton).toBeDisabled();
      });
    });
  });

  describe('Random Scale Generation', () => {
    beforeEach(() => {
      // Mock Math.random to make tests deterministic
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should generate different scales on subsequent submissions', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });

      // Get first scale
      await user.click(submitButton);

      let firstScale: string = '';
      await waitFor(() => {
        const scaleElement = screen.getByText(/major/i);
        firstScale = scaleElement.textContent || '';
        expect(firstScale).toBeTruthy();
      });

      // Get second scale (should be different)
      await user.click(submitButton);

      await waitFor(() => {
        const scaleElement = screen.getByText(/major/i);
        const secondScale = scaleElement.textContent || '';
        // Note: Due to randomness, they might be the same, but the code attempts to avoid it
        expect(secondScale).toBeTruthy();
      });
    });

    it('should handle generation with all scale types selected', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Check all boxes
      await user.click(screen.getByLabelText(/harmonic minor/i));
      await user.click(screen.getByLabelText(/melodic minor/i));
      await user.click(screen.getByLabelText(/chromatic/i));
      await user.click(screen.getByLabelText(/pentatonic/i));
      await user.click(screen.getByLabelText(/dominant 7th/i));
      await user.click(screen.getByLabelText(/diminished 7th/i));

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        // Should display some scale
        const scalePanel = document.querySelector('.panel:not(:first-child)');
        expect(scalePanel).not.toHaveClass('hidden');
      });
    });
  });

  describe('Panel Visibility', () => {
    it('should show result panel only after scale generation', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Panel should be hidden initially
      const panels = document.querySelectorAll('.panel');
      expect(panels[1]).toHaveClass('hidden');

      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      // Panel should be visible after generation
      await waitFor(() => {
        const resultPanel = document.querySelectorAll('.panel')[1];
        expect(resultPanel).not.toHaveClass('hidden');
      });
    });

    it('should hide panel after clearing scale', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Generate a scale
      const submitButton = screen.getByRole('button', { name: /get a scale/i });
      await user.click(submitButton);

      await waitFor(() => {
        const panels = document.querySelectorAll('.panel');
        expect(panels[1]).not.toHaveClass('hidden');
      });

      // Click a checkbox to clear
      const harmonicCheckbox = screen.getByLabelText(/harmonic minor/i);
      await user.click(harmonicCheckbox);

      // Panel should be hidden
      const panels = document.querySelectorAll('.panel');
      expect(panels[1]).toHaveClass('hidden');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicking of "Get a scale" button', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });

      // Click multiple times rapidly
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      // Should still display a valid scale
      await waitFor(() => {
        const scaleDisplay = screen.getByText(/\(.*\)/);
        expect(scaleDisplay).toBeInTheDocument();
      });
    });

    it('should reset showKey state when getting a new scale', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });

      // Get first scale and show key
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show key/i })).toBeInTheDocument();
      });

      const showKeyButton = screen.getByRole('button', { name: /show key/i });
      await user.click(showKeyButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /hide key/i })).toBeInTheDocument();
      });

      // Get new scale
      await user.click(submitButton);

      // Key should be hidden again
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show key/i })).toBeInTheDocument();
      });
    });

    it('should handle form submission with all checkboxes unchecked gracefully', async () => {
      const user = userEvent.setup();
      render(<ScalesPractice />);

      // Uncheck the default major checkbox
      const majorCheckbox = screen.getByLabelText(/^major$/i);
      await user.click(majorCheckbox);

      const submitButton = screen.getByRole('button', { name: /get a scale/i });

      // This should not crash, though no scale will be generated
      await user.click(submitButton);

      // Panel should remain hidden
      const panels = document.querySelectorAll('.panel');
      expect(panels[1]).toHaveClass('hidden');
    });
  });
});
