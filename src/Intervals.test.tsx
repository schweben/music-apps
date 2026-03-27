import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Intervals from './Intervals';

describe('Intervals Component', () => {
	describe('Component Rendering', () => {
		it('should render intervals form fields and submit button', () => {
			render(<Intervals />);

			expect(screen.getByText('Intervals')).toBeInTheDocument();
			expect(screen.getByText('Choose an interval')).toBeInTheDocument();
			expect(screen.getByLabelText(/note/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/interval/i)).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: /up/i })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: /down/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /transpose/i })).toBeInTheDocument();
		});

		it('should render note and interval options', () => {
			render(<Intervals />);

			const noteSelect = screen.getByLabelText(/note/i);
			const intervalSelect = screen.getByLabelText(/interval/i);

			expect(noteSelect.querySelectorAll('option').length).toBe(13);
			expect(intervalSelect.querySelectorAll('option').length).toBe(14);
			expect(intervalSelect).toHaveTextContent('Unison');
			expect(intervalSelect).toHaveTextContent('Octave');
		});

		it('should not show transposed note initially', () => {
			render(<Intervals />);

			const panels = document.querySelectorAll('.panel');
			expect(panels.length).toBe(1);
			expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
		});

		it('should keep submit button enabled with current validation wiring', () => {
			render(<Intervals />);

			const submitButton = screen.getByRole('button', { name: /transpose/i });
			expect(submitButton).toBeEnabled();
		});
	});

	describe('Transposition Behavior', () => {
		it('should transpose upward when direction is up', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'C');
			await user.selectOptions(screen.getByLabelText(/interval/i), '2');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('D');
			});
		});

		it('should transpose downward when direction is down', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'C');
			await user.selectOptions(screen.getByLabelText(/interval/i), '2');
			await user.click(screen.getByRole('radio', { name: /down/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('B♭/A♯');
			});
		});

		it('should handle enharmonic split matching when note is a single enharmonic value', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			const noteSelect = screen.getByLabelText(/note/i) as HTMLSelectElement;
			const dbOption = document.createElement('option');
			dbOption.value = 'D♭';
			dbOption.text = 'D♭';
			noteSelect.appendChild(dbOption);

			await user.selectOptions(noteSelect, 'D♭');
			await user.selectOptions(screen.getByLabelText(/interval/i), '0');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('C♯/D♭');
			});
		});

		it('should keep results hidden when source note has no match', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), '-');
			await user.selectOptions(screen.getByLabelText(/interval/i), '0');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
			});
		});
	});

	describe('Clear Values Behavior', () => {
		it('should clear transposed note when note value changes', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'C');
			await user.selectOptions(screen.getByLabelText(/interval/i), '4');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
			});

			await user.selectOptions(screen.getByLabelText(/note/i), 'D');

			expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
		});

		it('should clear transposed note when interval value changes', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'E');
			await user.selectOptions(screen.getByLabelText(/interval/i), '5');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
			});

			await user.selectOptions(screen.getByLabelText(/interval/i), '7');

			expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
		});

		it('should clear transposed note when direction changes to a checked value', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'G');
			await user.selectOptions(screen.getByLabelText(/interval/i), '3');
			await user.click(screen.getByRole('radio', { name: /up/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
			});

			await user.click(screen.getByRole('radio', { name: /down/i }));

			expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
		});

		it('should not clear transposed note when direction change event is unchecked', async () => {
			const user = userEvent.setup();
			render(<Intervals />);

			await user.selectOptions(screen.getByLabelText(/note/i), 'A');
			await user.selectOptions(screen.getByLabelText(/interval/i), '1');
			// Click down to make it checked (React tracks checked=true, clears any prior result)
			await user.click(screen.getByRole('radio', { name: /down/i }));
			await user.click(screen.getByRole('button', { name: /transpose/i }));

			await waitFor(() => {
				expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
			});

			// Fire change on the already-checked "down" radio with checked=false.
			// React detects the true→false transition and dispatches onChange with
			// checked=false, hitting the else branch of handleDirectionChange (no clearValues).
			const downRadio = screen.getByRole('radio', { name: /down/i });
			fireEvent.change(downRadio, { target: { checked: false } });

			expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
		});
	});
});
