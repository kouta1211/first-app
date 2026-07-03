import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../src/App';
import { Provider } from '@/components/ui/provider';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    expect(screen.getByText(/学習記録アプリ/i)).toBeInTheDocument();
  });
});
