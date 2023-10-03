import { useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { AuthContext } from '@/providers/auth/AuthProvider';
import { getSupabaseBrowserClient } from '@/utils/getSupabaseClient';

const useAuthChange = (): void => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  useVisibleTask$(() => {
    const supabaseClient = getSupabaseBrowserClient();

    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id) {
        authState.user = session.user;
        await navigate('/', { forceReload: true });
      } else {
        authState.user = null;
        await navigate('/login', { forceReload: true });
      }
    });
  });
};

export default useAuthChange;
