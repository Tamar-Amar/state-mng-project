// src/components/Navbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './NavBar';
import { userAtom } from '../store/userAtom';

describe('Navbar component', () => {
  it('renders the States button and navigates when clicked', () => {
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
        </MemoryRouter>
      </RecoilRoot>
    );
    
    const statesButton = screen.getByRole('button', { name: /States/i });
    expect(statesButton).toBeInTheDocument();
    fireEvent.click(statesButton);
  });
  

  it('shows Logout button if user is logged in', () => {
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
      };
      
    
    render(
      <RecoilRoot initializeState={(snap) => {
        snap.set(userAtom, initialUser);
      }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </RecoilRoot>
    );
    
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

});
