import { Slot, component$ } from '@builder.io/qwik';
import type { RequestHandler, DocumentHead } from '@builder.io/qwik-city';
import { createServerClient } from 'supabase-auth-helpers-qwik';

export const onRequest: RequestHandler = async (request) => {
  const supabaseClient = createServerClient(
    request.env.get('PUBLIC_SUPABASE_URL')!,
    request.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    request
  );

  const session = await supabaseClient.auth.getSession();

  if (session.data.session?.user.id) {
    throw request.redirect(302, new URL('/', request.url).toString());
  } else {
    await request.next();
  }
};

export default component$(() => {
  return <Slot />;
});

export const head: DocumentHead = {
  title: 'Glider Qwik',
  meta: [
    {
      name: 'description',
      content: 'Social network app',
    },
  ],
};
