import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
  $,
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

  const authenticateUser = $(async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  });

  useVisibleTask$(async () => {
    try {
      await authenticateUser();
      authState.isAuthenticated = true;
    } catch (error) {
      authState.isAuthenticated = false;
    } finally {
      authState.isLoading = false;
    }
  });

  return authState.isLoading ? <Loader /> : <Slot />;
});
