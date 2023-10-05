import { Slot, component$ } from '@builder.io/qwik';
import type { RequestHandler, RequestEvent } from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import useAuthChange from '@/hooks/useAuthChange';

export const onRequest: RequestHandler = async (request: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(request);

  const session = await supabaseClient.auth.getSession();

  if (session.data.session?.user.id) {
    throw request.redirect(302, new URL('/', request.url).toString());
  }

  await request.next();
};

export default component$(() => {
  useAuthChange();

  return <Slot />;
});
