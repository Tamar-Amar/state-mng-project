// src/components/state/StateTable.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { userAtom } from '../../store/userAtom';
import StatesTable from './StatesTable';
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
  permissions: { canAdd: true, canUpdate: true, canDelete: true },
};


const queryClient = new QueryClient();

import { vi } from 'vitest';

vi.mock('../../hooks/useStates', () => ({
  useStates: () => ({
    data: [
      {
        _id: 'state1',
        name: 'Test State',
        flag: 'https://example.com/flag.svg',
        population: 1000,
        region: 'Test Region',
        isActive: true,
        cities: [],
      },
    ],
    isLoading: false,
    isError: false,
  }),
  useDeleteState: () => ({
    mutate: (id: string, options: any) => {
      if (options && options.onSuccess) options.onSuccess();
    },
  }),
}));


describe('StatesTable Component', () => {
  it('renders table and displays action buttons', async () => {
    render(
        <QueryClientProvider client={queryClient}>
      <RecoilRoot initializeState={(snap) => {
        snap.set(userAtom, initialUser);
      }}>
        <MemoryRouter>
          <StatesTable />
        </MemoryRouter>
      </RecoilRoot>
      </QueryClientProvider>
    );
    
    const editButtons = await screen.findAllByRole('button', { name: /Edit/i });
    expect(editButtons.length).toBeGreaterThan(0);
  });
  
  it('shows snackbar message when delete permission is missing', async () => {
    const userWithoutDelete = {
      ...initialUser,
      permissions: { canAdd: true, canUpdate: true, canDelete: false },
    };
    render(
        <QueryClientProvider client={queryClient}>
            <RecoilRoot initializeState={(snap) => {
                snap.set(userAtom, userWithoutDelete);
            }}>
                <MemoryRouter>
                <StatesTable />
                </MemoryRouter>
            </RecoilRoot>
      </QueryClientProvider>
    );
    
    const deleteButton = await screen.findByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByText(/don’t have permission/i)).toBeInTheDocument();
    });
  });
});
