import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  describe('Component Rendering', () => {
    it('should render the main heading', () => {
      render(<Home />);
      expect(screen.getByText('Music Apps')).toBeInTheDocument();
    });

    it('should render Scales Practice section', () => {
      render(<Home />);
      expect(screen.getByText('Scales Practice')).toBeInTheDocument();
    });

    it('should render Transposition section', () => {
      render(<Home />);
      expect(screen.getByText('Transposition')).toBeInTheDocument();
    });

    it('should render description for Scales Practice', () => {
      render(<Home />);
      expect(screen.getByText('Get a random scale to play in your practice')).toBeInTheDocument();
    });

    it('should render description for Transposition', () => {
      render(<Home />);
      expect(screen.getByText('Transpose a key signature or individual note from one key to another')).toBeInTheDocument();
    });

    it('should render within a panel', () => {
      render(<Home />);
      const panel = document.querySelector('.panel');
      expect(panel).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('should have h1 heading for main title', () => {
      render(<Home />);
      const heading = screen.getByRole('heading', { level: 1, name: /music apps/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have h2 headings for feature sections', () => {
      render(<Home />);
      const scalesHeading = screen.getByRole('heading', { level: 2, name: /scales practice/i });
      const transposeHeading = screen.getByRole('heading', { level: 2, name: /transposition/i });

      expect(scalesHeading).toBeInTheDocument();
      expect(transposeHeading).toBeInTheDocument();
    });

    it('should have paragraphs for descriptions', () => {
      render(<Home />);
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBe(2);
    });

    it('should render sections in correct order', () => {
      render(<Home />);
      const headings = screen.getAllByRole('heading', { level: 2 });

      expect(headings[0]).toHaveTextContent('Scales Practice');
      expect(headings[1]).toHaveTextContent('Transposition');
    });
  });

  describe('Styling and Layout', () => {
    it('should have panel CSS class', () => {
      render(<Home />);
      const panel = document.querySelector('.panel');
      expect(panel).toHaveClass('panel');
    });

    it('should render all content within a single div container', () => {
      const { container } = render(<Home />);
      const topLevelDivs = container.querySelectorAll(':scope > div');
      expect(topLevelDivs.length).toBe(1);
    });
  });

  describe('Component Functionality', () => {
    it('should render without crashing', () => {
      const { container } = render(<Home />);
      expect(container).toBeInTheDocument();
    });

    it('should be a static component with no interactive elements', () => {
      render(<Home />);
      const buttons = screen.queryAllByRole('button');
      const inputs = screen.queryAllByRole('textbox');
      const links = screen.queryAllByRole('link');

      expect(buttons).toHaveLength(0);
      expect(inputs).toHaveLength(0);
      expect(links).toHaveLength(0);
    });

    it('should display informative content about the application', () => {
      render(<Home />);

      // Check that both feature descriptions are informative
      const scalesDescription = screen.getByText(/get a random scale/i);
      const transposeDescription = screen.getByText(/transpose a key signature/i);

      expect(scalesDescription).toBeInTheDocument();
      expect(transposeDescription).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />);

      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2s).toHaveLength(2);
    });

    it('should have readable text content', () => {
      render(<Home />);

      const allText = document.body.textContent;

      // All text should be present and readable
      expect(allText).toContain('Music Apps');
      expect(allText).toContain('Scales Practice');
      expect(allText).toContain('Transposition');
      expect(allText).toContain('random scale');
      expect(allText).toContain('key signature');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple renders without issues', () => {
      const { rerender } = render(<Home />);

      expect(screen.getByText('Music Apps')).toBeInTheDocument();

      rerender(<Home />);
      expect(screen.getByText('Music Apps')).toBeInTheDocument();

      rerender(<Home />);
      expect(screen.getByText('Music Apps')).toBeInTheDocument();
    });

    it('should maintain content integrity across renders', () => {
      const { container, rerender } = render(<Home />);
      const initialContent = container.innerHTML;

      rerender(<Home />);
      const rerenderedContent = container.innerHTML;

      expect(rerenderedContent).toBe(initialContent);
    });
  });
});
