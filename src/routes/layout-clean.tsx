import { Slot, component$ } from '@builder.io/qwik';
import type {
  RequestHandler,
  DocumentHead,
  RequestEvent,
} from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';

export const onRequest: RequestHandler = async (request: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(request);

  const session = await supabaseClient.auth.getSession();

  if (session.data.session?.user.id) {
    throw request.redirect(302, new URL('/', request.url).toString());
  }

  await request.next();
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
