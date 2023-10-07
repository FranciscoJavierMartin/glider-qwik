import { component$ } from '@builder.io/qwik';
import GlidePost from '@/components/glides/GlidePost';
import Messenger from '@/components/messenger/Messenger';
import { routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import useGlides from '@/hooks/useGlide';

export const useCreateGlide = routeAction$(
  async ({ content }, request) => {
    const supabaseClient = getSupabaseServerClient(request);
    const user = (await supabaseClient.auth.getSession()).data.session?.user;
    let success: boolean = false;

    if (user) {
      const { error } = await supabaseClient
        .from('glides')
        .insert({ uid: user.id, content });

      if (!error) {
        success = true;
      }
    }

    return { success };
  },
  zod$({
    content: z
      .string({ required_error: 'Glide is required' })
      .min(1, 'Glide is required'),
  })
);

export default component$(() => {
  const { glideStore } = useGlides();

  return (
    <>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      {/* GLIDE POST START */}
      {glideStore.pages[1].glides.map((glide) => (
        <GlidePost glide={glide} key={glide.id} />
      ))}
    </>
  );
});
