import type { User } from '@/types/user';
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

type AuthContextState = {
  user: User | null;
};

export const AuthContext = createContextId<AuthContextState>('auth-context');

export default component$(() => {
  const authState = useStore<AuthContextState>({
    user: null,
  });

  useContextProvider(AuthContext, authState);

  return <Slot />;
});
