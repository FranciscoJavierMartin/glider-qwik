import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { routeAction$, z, zod$ } from '@builder.io/qwik-city';
import GlidePost from '@/components/glides/GlidePost';
import Messenger from '@/components/messenger/Messenger';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import useGlides from '@/hooks/useGlide';
import type { Glide } from '@/types/glide';
import type { User } from '@/types/user';

export const useCreateGlide = routeAction$(
  async ({ content }, request) => {
    const supabaseClient = getSupabaseServerClient(request);
    const user = (await supabaseClient.auth.getSession()).data.session?.user;
    let success: boolean = false;
    let glide: Glide | null = null;

    if (user) {
      const { error, data } = await supabaseClient
        .from('glides')
        .insert({ uid: user.id, content })
        .select(
          'id, content, likesCount, subglidesCount, date, user:users (nickName, avatar)'
        )
        .single();

      if (!error) {
        success = true;
        glide = { ...data, user: data.user as Partial<User> };
      }
    }

    return { success, glide };
  },
  zod$({
    content: z
      .string({ required_error: 'Glide is required' })
      .min(1, 'Glide is required'),
  })
);

export default component$(() => {
  const { glideStore, pageNumber, loadGlides } = useGlides();

  const glides = useResource$(async () => {
    await loadGlides();
    return glideStore;
  });

  return (
    <>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      <Resource
        value={glides}
        onRejected={() => <p>Failed</p>}
        onPending={() => <p>Loading...</p>}
        onResolved={(glides) => {
          return (
            <>
              {Array.from({ length: pageNumber.value }).map((_, page) =>
                glides.pages[page + 1].glides.map((glide) => (
                  <GlidePost key={glide.id} glide={glide} />
                ))
              )}
            </>
          );
        }}
      />
    </>
  );
});
