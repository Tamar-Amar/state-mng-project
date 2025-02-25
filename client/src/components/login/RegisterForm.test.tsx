// src/components/login/RegisterForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RegisterForm from './RegisterForm';
/// <reference types="vitest" />


// You may need to mock your hooks (e.g., useRegisterUser) to simulate API behavior
vi.mock('../../hooks/useAuth', () => ({
  useRegisterUser: () => ({
    mutate: (data: any, { onSuccess }: any) => onSuccess(), // call success immediately
  }),
  useCurrentUser: () => null,
}));

describe('RegisterForm', () => {
  it('renders the registration form with all fields', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </RecoilRoot>
    );
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    // ...and so on for other fields
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </RecoilRoot>
    );
    
    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);
    
    // Wait for validation messages to appear (assuming formik async validation)
    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBeGreaterThan(0);
    });
    
  });
});
