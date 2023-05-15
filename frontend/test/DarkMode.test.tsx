import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import DarkModeButton from '../src/components/DarkModeButton';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test('DarkModeButton toggles a dialog', () => {
    render(
        <DarkModeButton inheritedClassNames={""} />
    );
    //    const user = userEvent.setup()
    const input = screen.getByRole('button')
    fireEvent.click(input)

    //    user.click(input)
    expect(screen.getByRole('dialog'))
    fireEvent.click(input)
    expect(screen.queryByRole('dialog')).toBe(null)
});

test('DarkModeDialogBox adds dark mode', () => {
    render(
        <DarkModeButton inheritedClassNames={""} />
    );
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const dialogCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(document.body).not.toHaveClass('dark')
    expect(dialogCheckbox.checked).toEqual(false)

    fireEvent.click(dialogCheckbox)

    expect(dialogCheckbox.checked).toEqual(true)
    expect(document.body).toHaveClass('dark')

    fireEvent.click(dialogCheckbox)

    expect(dialogCheckbox.checked).toEqual(false)
    expect(document.body).not.toHaveClass('dark')
});