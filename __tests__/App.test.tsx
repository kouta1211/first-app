import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import { App } from '../src/App';
import { Provider } from '@/components/ui/provider';
import { Record } from '@/domain/records';

const mockGetAllRecords = vi
  .fn()
  .mockResolvedValue([
    new Record(1, 'title1', 1),
    new Record(2, 'title2', 2),
    new Record(3, 'title3', 3),
    new Record(4, 'title4', 4),
  ]);
vi.mock('../src/lib/records.ts', () => {
  return {
    GetAllRecords: () => mockGetAllRecords(),
  };
});

describe('App', () => {
  test('タイトルが表示されること', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    await waitFor(() => screen.getByTestId('title'));
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  test('Recordsが4つ表示されること', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    await waitFor(() => screen.getByTestId('table'));
    const todos = screen.getByTestId('table').querySelectorAll('tr');
    expect(todos.length - 1).toBe(4);
  });
});
