// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { getCurrentUser, loginUser, registerUser } from '../services/authService';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/userAtom';
import { useEffect, useState } from 'react';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
    },
  });
};

export const useCurrentUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getCurrentUser()
        .then((response) => {
          setUser(response.user);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  return { user, loading };
};
