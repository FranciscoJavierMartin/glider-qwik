import type { User } from '@/types/user';
import { getSupabaseBrowserClient } from '@/utils/getSupabaseClient';
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

type AuthContextState = {
  user: User | null;
};

export const AuthContext = createContextId<AuthContextState>('auth-context');

export default component$(() => {
  const authState = useStore<AuthContextState>({
    user: null,
  });

  useVisibleTask$(async () => {
    const supabaseClient = getSupabaseBrowserClient();

    const session = await supabaseClient.auth.getSession();
    if (session.data.session?.user.id) {
      const user = await supabaseClient
        .from('users')
        .select(
          'uid, avatar, followersCount, followingCount, fullName, nickName, email'
        )
        .eq('uid', session.data.session.user.id)
        .single();

      authState.user = user.data;
    } else {
      authState.user = null;
    }
  });

  useContextProvider(AuthContext, authState);

  return <Slot />;
});
