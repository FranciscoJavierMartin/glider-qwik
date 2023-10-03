import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik';
import {
  type RequestHandler,
  type DocumentHead,
  type RequestEvent,
  useNavigate,
} from '@builder.io/qwik-city';
import {
  getSupabaseBrowserClient,
  getSupabaseServerClient,
} from '@/utils/getSupabaseClient';

export const onRequest: RequestHandler = async (request: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(request);

  const session = await supabaseClient.auth.getSession();

  if (session.data.session?.user.id) {
    throw request.redirect(302, new URL('/', request.url).toString());
  }

  await request.next();
};

export default component$(() => {
  const navigate = useNavigate();

  useVisibleTask$(() => {
    const supabaseClient = getSupabaseBrowserClient();

    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id) {
        navigate('/', { forceReload: true });
      }
    });
  });

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
