// src/components/login/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { RecoilRoot } from 'recoil';
/// <reference types="vitest" />


vi.mock('../../hooks/useAuth', () => ({
  useLoginUser: () => ({
    mutate: (credentials: any, { onSuccess }: any) => onSuccess({ token: 'fakeToken', user: { _id: '123', firstName: 'Test', role: 'user' } }),
    isPending: false,
  }),
}));

describe('LoginForm', () => {
  it('renders login form and displays success message on successful login', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </RecoilRoot>
    );

    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameField, { target: { value: 'testuser' } });
    fireEvent.change(passwordField, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });
  });
});
