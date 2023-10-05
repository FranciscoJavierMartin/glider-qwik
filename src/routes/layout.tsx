import { Slot, component$ } from '@builder.io/qwik';
import { type DocumentHead, type RequestHandler } from '@builder.io/qwik-city';
import { Portal, PortalProvider } from '@/providers/portal/PortalProvider';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import useAuthChange from '@/hooks/useAuthChange';

export const onRequest: RequestHandler = async (request) => {
  const supabaseClient = getSupabaseServerClient(request);

  await supabaseClient.auth.reauthenticate();
  const session = await supabaseClient.auth.getSession();

  if (!session.data.session) {
    throw request.redirect(302, '/login/');
  }

  await request.next();
};

export default component$(() => {
  useAuthChange();

  return (
    <PortalProvider>
      <Slot />
      <Portal name='popup' />
      <Portal name='snackbar' />
    </PortalProvider>
  );
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
