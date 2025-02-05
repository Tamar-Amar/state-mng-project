// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService';
import { User } from '../types';

export const useUsers = () => useQuery<User[]>('users', fetchUsers);

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: (newUser: User) => {
      queryClient.setQueryData<User[]>('users', (oldUsers) =>
        oldUsers ? [...oldUsers, newUser] : [newUser]
      );
    },
  });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation((user: User) => updateUser(user._id!, user), {
      onSuccess: (updatedUser: User) => {
        queryClient.setQueryData<User[]>('users', (oldUsers) =>
          oldUsers
            ? oldUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            : [updatedUser]
        );
      },
    });
  };

  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<{ message: string, user: User }, unknown, string, unknown>(
      (id: string) => deleteUser(id),
      {
        onSuccess: (data) => {
          queryClient.setQueryData<User[]>('users', (oldUsers) =>
            oldUsers ? oldUsers.filter((user) => user._id !== data.user._id) : []
          );
        },
      }
    );
  };
