import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HelpPanel from './HelpPanel';

describe('HelpPanel Component', () => {
  describe('Component Rendering', () => {
    it('should render the help button', () => {
      render(<HelpPanel message="Test message" />);
      const button = screen.getByRole('button', { name: /\?/i });
      expect(button).toBeInTheDocument();
    });

    it('should have correct CSS class on help button', () => {
      render(<HelpPanel message="Test message" />);
      const button = screen.getByRole('button', { name: /\?/i });
      expect(button).toHaveClass('help-button');
    });

    it('should not show help panel initially', () => {
      render(<HelpPanel message="Test message" />);
      const helpPanel = document.querySelector('.help-panel');
      expect(helpPanel).not.toBeInTheDocument();
    });

    it('should only render the help button container initially', () => {
      const { container } = render(<HelpPanel message="Test message" />);
      const divs = container.querySelectorAll('div');
      expect(divs).toHaveLength(1);
    });
  });

  describe('Help Button Interaction', () => {
    it('should display help panel when help button is clicked', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const button = screen.getByRole('button', { name: /\?/i });
      await user.click(button);

      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render help panel with correct message', async () => {
      const user = userEvent.setup();
      const testMessage = 'This is a help message';
      render(<HelpPanel message={testMessage} />);

      const button = screen.getByRole('button', { name: /\?/i });
      await user.click(button);

      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('should display help panel in a paragraph', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const button = screen.getByRole('button', { name: /\?/i });
      await user.click(button);

      const paragraph = screen.getByRole('paragraph');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Test message');
    });

    it('should have correct CSS class on help panel', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const button = screen.getByRole('button', { name: /\?/i });
      await user.click(button);

      const helpPanel = document.querySelector('.help-panel');
      expect(helpPanel).toBeInTheDocument();
      expect(helpPanel).toHaveClass('help-panel');
    });

    it('should render close button when help panel is open', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      const closeButton = screen.getByRole('button', { name: /X/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should have correct CSS class on close button', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      const closeButton = screen.getByRole('button', { name: /X/i });
      expect(closeButton).toHaveClass('close-button');
    });
  });

  describe('Help Panel Closing', () => {
    it('should close help panel when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      const message = screen.getByText('Test message');
      expect(message).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);

      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('should not show help panel after closing', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      const closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);

      const helpPanel = document.querySelector('.help-panel');
      expect(helpPanel).not.toBeInTheDocument();
    });

    it('should allow reopening help panel after closing', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      let message = screen.getByText('Test message');
      expect(message).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);

      expect(screen.queryByText('Test message')).not.toBeInTheDocument();

      await user.click(helpButton);

      message = screen.getByText('Test message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('Multiple Interactions', () => {
    it('should handle multiple open and close cycles', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="Test message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });

      // Open
      await user.click(helpButton);
      expect(screen.getByText('Test message')).toBeInTheDocument();

      // Close
      let closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();

      // Open again
      await user.click(helpButton);
      expect(screen.getByText('Test message')).toBeInTheDocument();

      // Close again
      closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('should display different messages when message prop changes', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<HelpPanel message="First message" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      expect(screen.getByText('First message')).toBeInTheDocument();

      // Close the help panel
      const closeButton = screen.getByRole('button', { name: /X/i });
      await user.click(closeButton);

      // Change the message prop
      rerender(<HelpPanel message="Second message" />);

      // Open with new message
      await user.click(helpButton);
      expect(screen.getByText('Second message')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty message string', async () => {
      const user = userEvent.setup();
      render(<HelpPanel message="" />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      const helpPanel = document.querySelector('.help-panel');
      expect(helpPanel).toBeInTheDocument();
    });

    it('should handle long message strings', async () => {
      const user = userEvent.setup();
      const longMessage = 'This is a very long message that contains a lot of text to test how the help panel handles longer content without breaking or causing layout issues.';
      render(<HelpPanel message={longMessage} />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle special characters in message', async () => {
      const user = userEvent.setup();
      const specialMessage = 'Test with special chars: @#$%^&*()';
      render(<HelpPanel message={specialMessage} />);

      const helpButton = screen.getByRole('button', { name: /\?/i });
      await user.click(helpButton);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});
