import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { App } from '@/App';
import { Record } from '@/domain/records';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  mockGetAllRecords: vi.fn(),
  mockCreateRecord: vi.fn(),
  mockDeleteRecord: vi.fn(),
  mockEditRecord: vi.fn(),
}));

vi.mock('@/lib/records', () => ({
  GetAllRecords: mocks.mockGetAllRecords,
  CreateRecord: mocks.mockCreateRecord,
  DeleteRecord: mocks.mockDeleteRecord,
  EditRecord: mocks.mockEditRecord,
}));

const openModal = async () => {
  const user = userEvent.setup();
  render(
    <Provider>
      <App />
    </Provider>
  );

  await user.click(screen.getByRole('button', { name: '新規登録' }));
  return user;
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Loading画面をみれること', () => {
    mocks.mockGetAllRecords.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('テーブルをみれること', async () => {
    mocks.mockGetAllRecords.mockResolvedValue([]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByTestId('title')).toBeInTheDocument();
  });

  test('新規登録ボタンが表示されること', async () => {
    mocks.mockGetAllRecords.mockResolvedValue([]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByTestId('add_button')).toBeInTheDocument();
  });

  test('タイトルが表示されること', async () => {
    mocks.mockGetAllRecords.mockResolvedValue([]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByTestId('title')).toBeInTheDocument();
  });

  test('Recordsが4つ表示されること', async () => {
    mocks.mockGetAllRecords.mockResolvedValue([
      new Record(1, 'title1', 1),
      new Record(2, 'title2', 2),
      new Record(3, 'title3', 3),
      new Record(4, 'title4', 4),
    ]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    const table = await screen.findByTestId('table');

    const rows = table.querySelectorAll('tr');

    // ヘッダー + データ4件
    expect(rows).toHaveLength(5);
  });

  test('登録モーダルのタイトルが合っている', async () => {
    const user = userEvent.setup();
    mocks.mockGetAllRecords.mockResolvedValue([]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    const addButton = screen.getByRole('button', { name: '新規登録' });
    await user.click(addButton);

    expect(
      await screen.findByText('学習記録を入力してください')
    ).toBeInTheDocument();
  });

  test('学習内容がないときに登録するとエラーがでる', async () => {
    const user = await openModal();

    await user.type(screen.getByLabelText('学習時間'), '10');
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(await screen.findByText('タイトルは必須です')).toBeInTheDocument();
  });

  test('学習時間がないときに登録するとエラーがでる', async () => {
    const user = await openModal();

    await user.type(screen.getByLabelText('タイトル'), 'React学習');
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(await screen.findByText('時間は必須です')).toBeInTheDocument();
  });

  test('未入力エラー', async () => {
    const user = await openModal();

    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(await screen.findByText('タイトルは必須です')).toBeInTheDocument();
    expect(await screen.findByText('時間は必須です')).toBeInTheDocument();
  });

  test('0以上でないときのエラー', async () => {
    const user = await openModal();

    await user.type(screen.getByLabelText('学習時間'), '-1');
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(
      await screen.findByText('1以上を入力してください')
    ).toBeInTheDocument();
  });

  test('学習記録が削除できること', async () => {
    const user = userEvent.setup();
    mocks.mockGetAllRecords
      .mockResolvedValueOnce([
        new Record(1, 'React', 10),
        new Record(2, 'TypeScript', 20),
      ])
      .mockResolvedValueOnce([new Record(1, 'React', 10)]);

    mocks.mockDeleteRecord.mockResolvedValue(undefined);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    const deleteButtons = screen.getAllByTestId(/delete-/);

    await user.click(deleteButtons[1]);

    expect(await screen.findByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();

    expect(mocks.mockDeleteRecord).toHaveBeenCalledWith(2);
  });

  test('編集モーダルのタイトルが合っている', async () => {
    const user = userEvent.setup();
    mocks.mockGetAllRecords.mockResolvedValue([new Record(1, 'React', 10)]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByText('React')).toBeInTheDocument();
    const editButtons = screen.getAllByTestId(/edit-/);
    await user.click(editButtons[0]);

    expect(await screen.findByText('学習記録を編集')).toBeInTheDocument();
  });

  test('編集することができる', async () => {
    const user = userEvent.setup();
    mocks.mockGetAllRecords.mockResolvedValueOnce([new Record(1, 'React', 10)]);

    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(await screen.findByText('React')).toBeInTheDocument();
    const editButtons = screen.getAllByTestId(/edit-/);
    await user.click(editButtons[0]);

    const titleInput = screen.getByRole('textbox', {
      name: 'タイトル',
    });
    const timeInput = screen.getByRole('spinbutton', {
      name: '学習時間',
    });

    await user.clear(titleInput);
    await user.type(titleInput, 'Typescript');
    await user.clear(timeInput);
    await user.type(timeInput, '20');
    await user.click(
      screen.getByRole('button', {
        name: '更新',
      })
    );

    expect(mocks.mockEditRecord).toHaveBeenCalledWith(1, 'Typescript', 20);
  });
});
