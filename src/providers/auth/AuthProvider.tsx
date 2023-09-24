import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import Loader from '@/components/loader/Loader';

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContextId<AuthState>('auth');

export default component$(() => {
  const authState = useStore({
    isAuthenticated: false,
    isLoading: true,
  });

  useContextProvider(AuthContext, authState);

  useVisibleTask$(() => {
    setTimeout(() => {
      authState.isLoading = false;
    }, 1000);
  });

  return authState.isLoading ? <Loader size={100} /> : <Slot />;
});
