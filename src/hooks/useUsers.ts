import { $, useSignal, useTask$ } from '@builder.io/qwik';
import type { User } from '@/types/user';

const useUsers = () => {
  const users = useSignal<User[]>([]);

  const loadUsers = $(async () => {
    try {
      const response = await fetch('http://localhost:3501/api/users');
      users.value = await response.json();
    } catch (error) {
      console.log(error);
    }
  });

  useTask$(async () => {
    await loadUsers();
  });

  return { users };
};

export default useUsers;
