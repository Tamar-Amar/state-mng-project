// src/components/state/StateForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import StateForm from './StateForm';
import { userAtom } from '../../store/userAtom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const initialUser = {
  _id: '123',
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  profilePicture: '',
  role: 'user' as 'user',
  email: 'test@example.com',
  phone: '1234567890',
  joinDate: new Date(),
  permissions: { canAdd: true, canUpdate: false, canDelete: false },
};

const queryClient = new QueryClient();

describe('StateForm Component - Add Mode', () => {
  it('renders the form with empty initial values', () => {
    render(
        <QueryClientProvider client={queryClient}>
      <RecoilRoot initializeState={(snap) => {
        snap.set(userAtom, initialUser);
      }}>
        <MemoryRouter initialEntries={['/state-form']}>
          <StateForm />
        </MemoryRouter>
      </RecoilRoot>
      </QueryClientProvider>
    );
    
    const nameField = screen.getByLabelText(/State Name/i);
    expect(nameField).toBeInTheDocument();
    expect(nameField).toHaveValue('');
  });
  
  it('shows validation errors when submitting empty form', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={(snap) => {
          snap.set(userAtom, initialUser);
        }}>
          <MemoryRouter initialEntries={['/state-form']}>
            <StateForm />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>
    );
    
    // לדמות פעולת blur על השדות כדי שהשדות יסומנו כ-touched
    const nameField = screen.getByLabelText(/State Name/i);
    fireEvent.blur(nameField);
    
    const flagField = screen.getByLabelText(/Flag URL/i);
    fireEvent.blur(flagField);
    
    const populationField = screen.getByLabelText(/Population/i);
    fireEvent.blur(populationField);
    
    // אם יש שדות נוספים, לדמות גם להם blur
  
    const submitButton = screen.getByRole('button', { name: /Add State/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // נבדוק שהודעת שגיאה מופיעה – נשתמש ב-getAllByText כדי לקבל את כל ההודעות
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });
  
});
