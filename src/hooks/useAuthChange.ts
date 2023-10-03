import { getSupabaseBrowserClient } from '@/utils/getSupabaseClient';
import { useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

const useAuthChange = (): void => {
  const navigate = useNavigate();

  useVisibleTask$(() => {
    const supabaseClient = getSupabaseBrowserClient();

    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id) {
        await navigate('/', { forceReload: true });
      } else {
        await navigate('/login', { forceReload: true });
      }
    });
  });
};

export default useAuthChange;
