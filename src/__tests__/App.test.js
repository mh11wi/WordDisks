import { act, render, screen, fireEvent } from '@testing-library/react';
import App from 'src/App';

window.adConfig = vi.fn();

vi.mock('random-words', async (importOriginal) => {
  const mod = await importOriginal();
  const mockWordList = [];

  // same length as actual word list
  for (let i = 0; i < 1952; i++) {
    // unique strings with 3 - 7 characters
    if (i < 1500) {
      mockWordList.push('ab' + i.toString());
    } else {
      mockWordList.push('abc' + i.toString());
    }
  }
  
  return {
    ...mod,
    wordList: mockWordList
  }
});

async function renderApp() {
  await act(async () => {
    render(<App />);
    await vi.dynamicImportSettled();
  });
}

test('The help menu displays on load', async () => {
  await renderApp();
  const dialog = await screen.findByRole('dialog', { name: /How To Play/i });
  expect(dialog).toBeInTheDocument();
});

test('There is an app bar with the title', async () => {
  await renderApp();
  const dialogClose = screen.getByRole('button', { name: /Close/i });
  fireEvent.click(dialogClose);
  const heading = await screen.findByRole('heading', { name: /Word Disks/i });
  expect(heading).toBeInTheDocument();
});

test('There is at least one disk', async () => {
  await renderApp();
  const dialogClose = screen.getByRole('button', { name: /Close/i });
  fireEvent.click(dialogClose);
  const disk = await screen.findByRole('button', { name: /disk 1/i });
  expect(disk).toBeInTheDocument();
});