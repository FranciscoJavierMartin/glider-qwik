import { component$, useSignal, $, useOnWindow } from '@builder.io/qwik';
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
  const lastItemRef = useSignal<HTMLDivElement>();
  const glidesHook = useGlides();

  const loadNewItems = $(() => {
    if (
      lastItemRef.value &&
      lastItemRef.value.getBoundingClientRect().top <= window.innerHeight
    ) {
      glidesHook.loadGlides();
    }
  });

  useOnWindow('scroll', loadNewItems);

  return (
    <>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      <>
        {Array.from({ length: glidesHook.pageNumber.value }).map(
          (_, page) =>
            glidesHook.glideStore.pages[page + 1]?.glides.map((glide) => (
              <GlidePost key={glide.id} glide={glide} />
            ))
        )}
      </>
      <div ref={lastItemRef} />
      <div class='h-96' />
    </>
  );
});
