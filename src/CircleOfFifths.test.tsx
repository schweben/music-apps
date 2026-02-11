import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CircleOfFifths from './CircleOfFifths';

// Basic test class for CircleOfFifths component

describe('CircleOfFifths Component', () => {
  describe('Component Rendering', () => {
    it('should render the canvas element', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should render within a panel div', () => {
      render(<CircleOfFifths />);
      const panel = document.querySelector('.panel');
      expect(panel).toBeInTheDocument();
    });
  });

  describe('Canvas Drawing', () => {
    it('should have canvas with correct dimensions', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas?.width).toBe(600);
      expect(canvas?.height).toBe(600);
    });
  });
});
