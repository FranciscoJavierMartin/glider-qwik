import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

type AuthContextState = {
  user: object | null;
};

export const AuthContext = createContextId<AuthContextState>('auth-context');

export default component$(() => {
  const authState = useStore<AuthContextState>({
    user: null,
  });

  useContextProvider(AuthContext, authState);

  return <Slot />;
});
