import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  describe('Navigation Bar', () => {
    it('should render navigation links', () => {
      render(<App />);

      expect(screen.getByRole('link', { name: /circle of fifths/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /transposition/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /scales practice/i })).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      render(<App />);

      expect(screen.getByRole('link', { name: /circle of fifths/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /transposition/i })).toHaveAttribute('href', '/transpose');
      expect(screen.getByRole('link', { name: /scales practice/i })).toHaveAttribute('href', '/scales');
    });

    it('should render nav element', () => {
      render(<App />);

      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have all navigation links inside nav element', () => {
      render(<App />);

      const nav = document.querySelector('nav');
      const links = nav?.querySelectorAll('a');

      expect(links).toHaveLength(3);
    });
  });

  describe('Routing', () => {
    it('should render CircleOfFifths component on root path', () => {
      // App uses BrowserRouter internally, so just render App
      // The default route is already '/'
      render(<App />);

      expect(screen.getByRole('heading', { name: /circle of fifths/i })).toBeInTheDocument();
    });

    it('should render Transpose component on /transpose path', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Navigate to transpose
      const transposeLink = screen.getByRole('link', { name: /transposition/i });
      await user.click(transposeLink);

      expect(screen.getByLabelText(/source instrument key/i)).toBeInTheDocument();
    });

    it('should render ScalesPractice component on /scales path', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Navigate to scales
      const scalesLink = screen.getByRole('link', { name: /scales practice/i });
      await user.click(scalesLink);

      expect(screen.getByText('Select which type of scale to practice')).toBeInTheDocument();
    });

    it('should navigate between routes', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Should start on circle of fifths
      expect(screen.getByRole('heading', { name: /circle of fifths/i })).toBeInTheDocument();

      // Navigate to transpose
      const transposeLink = screen.getByRole('link', { name: /transposition/i });
      await user.click(transposeLink);

      expect(screen.getByLabelText(/source instrument key/i)).toBeInTheDocument();

      // Navigate to scales
      const scalesLink = screen.getByRole('link', { name: /scales practice/i });
      await user.click(scalesLink);

      expect(screen.getByText('Select which type of scale to practice')).toBeInTheDocument();

      // Navigate back to Circle of Fifths
      const circleOfFifthsLink = screen.getByRole('link', { name: /circle of fifths/i });
      await user.click(circleOfFifthsLink);

      expect(screen.getByRole('heading', { name: /circle of fifths/i })).toBeInTheDocument();
    });
  });

  describe('Application Structure', () => {
    it('should have App className on root div', () => {
      render(<App />);

      const appDiv = document.querySelector('.App');
      expect(appDiv).toBeInTheDocument();
    });

    it('should render BrowserRouter', () => {
      render(<App />);

      // BrowserRouter should allow navigation
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should maintain navigation across all routes', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Navigate to transpose
      const transposeLink = screen.getByRole('link', { name: /transposition/i });
      await user.click(transposeLink);

      // Navigation should be present on all pages
      expect(screen.getByRole('link', { name: /circle of fifths/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /transposition/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /scales practice/i })).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render without crashing', () => {
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should have proper component hierarchy', () => {
      render(<App />);

      const appDiv = document.querySelector('.App');
      const nav = document.querySelector('nav');

      expect(appDiv).toContainElement(nav);
    });

    it('should only render one route component at a time', () => {
      render(<App />);

      // Circle of Fifths page should be visible
      expect(screen.getByRole('heading', { name: /circle of fifths/i })).toBeInTheDocument();

      // Transpose and Scales pages should not be visible
      expect(screen.queryByLabelText(/source instrument key/i)).not.toBeInTheDocument();
      expect(screen.queryByText('Select which type of scale to practice')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<App />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should have clickable links', async () => {
      const user = userEvent.setup();
      render(<App />);

      const circleOfFifthsLink = screen.getByRole('link', { name: /circle of fifths/i });
      const transposeLink = screen.getByRole('link', { name: /transposition/i });
      const scalesLink = screen.getByRole('link', { name: /scales practice/i });

      // All links should be clickable
      await user.click(transposeLink);
      expect(screen.getByLabelText(/source instrument key/i)).toBeInTheDocument();

      await user.click(scalesLink);
      expect(screen.getByText('Select which type of scale to practice')).toBeInTheDocument();

      await user.click(circleOfFifthsLink);
      expect(screen.getByRole('heading', { name: /circle of fifths/i })).toBeInTheDocument();
    });
  });
});
