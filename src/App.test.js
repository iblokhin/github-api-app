import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import App from './App';

const queryClient = new QueryClient();

test('change search input', () => {
  const history = createMemoryHistory();

  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  fireEvent.change(getByTestId('search-input'), { target: { value: 'ruby' } });

  expect(getByTestId('search-input')).toHaveValue('ruby');
});
