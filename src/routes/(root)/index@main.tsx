import { component$, useSignal } from '@builder.io/qwik';
import GlidePost from '@/components/glides/GlidePost';
import type { Glide } from '@/types/glide';
import Messenger from '@/components/messenger/Messenger';
import { routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';

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
  const glides = useSignal<Glide[]>([]);

  return (
    <>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      {/* GLIDE POST START */}
      {glides.value.map((glide) => (
        <GlidePost glide={glide} key={glide.id} />
      ))}
    </>
  );
});
