import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CircleOfFifths from './CircleOfFifths';

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

    it('should have correct canvas ID', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('#circleOfFifths');
      expect(canvas).toBeInTheDocument();
    });

    it('should render HelpPanel component', () => {
      render(<CircleOfFifths />);
      // HelpPanel should be rendered (it contains the help message)
      const panelHeader = document.querySelector('.panel-header');
      expect(panelHeader).toBeInTheDocument();
    });

    it('should render heading with correct title', () => {
      render(<CircleOfFifths />);
      const heading = screen.getByRole('heading', { name: /Circle of Fifths/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render panel header', () => {
      render(<CircleOfFifths />);
      const header = document.querySelector('.panel-header');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Canvas Drawing', () => {
    it('should have canvas with correct dimensions on desktop', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas?.width).toBe(600);
      expect(canvas?.height).toBe(600);
    });

    it('should set canvas context on render', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
      const ctx = canvas.getContext('2d');
      expect(ctx).not.toBeNull();
    });
  });

  describe('Canvas Interaction', () => {
    it('should render clickable canvas element', () => {
      const { container } = render(<CircleOfFifths />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should handle canvas clicks', async () => {
      const user = userEvent.setup();
      const { container } = render(<CircleOfFifths />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;

      expect(canvas).toBeInTheDocument();
      // Simulate a click on the canvas (at center position to ensure it's a valid click)
      await user.click(canvas);
      expect(canvas).toBeInTheDocument();
    });

    it('should handle multiple clicks on canvas', async () => {
      const user = userEvent.setup();
      const { container } = render(<CircleOfFifths />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;

      // First click
      await user.click(canvas);
      expect(canvas).toBeInTheDocument();

      // Second click
      await user.click(canvas);
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
      // Restore original window width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      });
    });

    it('should render canvas at desktop size by default', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas?.width).toBe(600);
      expect(canvas?.height).toBe(600);
    });

    it('should have a canvas element after rendering', () => {
      render(<CircleOfFifths />);
      const canvas = document.querySelector('canvas');
      expect(canvas).toBeTruthy();
      expect(canvas?.tagName).toBe('CANVAS');
    });
  });

  describe('Canvas Content', () => {
    it('should render canvas with proper setup', () => {
      const { container } = render(<CircleOfFifths />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;

      expect(canvas).toBeInTheDocument();
      expect(canvas.width).toBeGreaterThan(0);
      expect(canvas.height).toBeGreaterThan(0);
    });

    it('should initialize canvas without errors', () => {
      const { container } = render(<CircleOfFifths />);
      const canvas = container.querySelector('canvas');

      expect(canvas).toBeInTheDocument();
      const ctx = canvas?.getContext('2d');
      expect(ctx).not.toBeNull();
    });
  });

  describe('Component Structure', () => {
    it('should have correct DOM structure', () => {
      const { container } = render(<CircleOfFifths />);

      const panel = container.querySelector('.panel');
      const panelHeader = panel?.querySelector('.panel-header');
      const heading = panelHeader?.querySelector('h1');
      const canvas = panel?.querySelector('canvas');

      expect(panel).toBeInTheDocument();
      expect(panelHeader).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(canvas).toBeInTheDocument();
    });

    it('should render heading inside panel header', () => {
      const { container } = render(<CircleOfFifths />);
      const heading = container.querySelector('.panel-header h1');

      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe('Circle of Fifths');
    });
  });
});
