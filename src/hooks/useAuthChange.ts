import { useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { AuthContext } from '@/providers/auth/AuthProvider';
import { getSupabaseBrowserClient } from '@/utils/getSupabaseClient';
import { getUserProfile } from '@/utils/getUserProfile';

const useAuthChange = (): void => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  useVisibleTask$(({ cleanup }) => {
    const supabaseClient = getSupabaseBrowserClient();

    const unsubscribe = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user.id && authState.user?.uid !== session.user.id) {
          authState.user = await getUserProfile(session.user.id);
          await navigate('/', { forceReload: true });
        } else {
          authState.user = null;
          await navigate('/login', { forceReload: true });
        }
      }
    );

    cleanup(() => unsubscribe.data.subscription.unsubscribe());
  });
};

export default useAuthChange;
