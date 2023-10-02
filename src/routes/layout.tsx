import { Slot, component$ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import MainSidebar from '@/components/sidebars/Main';
import TrendsSidebar from '@/components/sidebars/Trends';
import { Portal, PortalProvider } from '@/providers/portal/PortalProvider';
import { createServerClient } from 'supabase-auth-helpers-qwik';

export const onRequest: RequestHandler = async (request) => {
  const supabaseClient = createServerClient(
    request.env.get('PUBLIC_SUPABASE_URL')!,
    request.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    request
  );

  await supabaseClient.auth.reauthenticate();
  const session = await supabaseClient.auth.getSession();

  if (!session.data) {
    request.redirect(302, '/login/');
  }

  await request.next();
};

export default component$(() => {
  return (
    <PortalProvider>
      <div class='w-full h-full bg-gray-900 text-gray-100'>
        <div class='flex h-full min-h-252'>
          <MainSidebar />
          <main class='flex-it flex-grow flex-shrink items-start'>
            <div class='flex md:w-248 w-full h-full'>
              <div class='flex-it flex-grow flex-shrink'>
                <div class='flex-it flex-row justify-between min-h-full'>
                  <div class='flex-it md:max-w-152 w-full border-x-1 border-solid border-gray-700'>
                    <div class='sticky z-10 flex-it top-0'>
                      <div class='flex-it h-14 p-4 xl:text-xl text-sm font-bold z-10 backdrop-blur-md bg-opacity-70'>
                        Home
                      </div>
                    </div>
                    <Slot />
                  </div>
                  <div class='flex-it md:w-92 w-0 mt-4'>
                    <TrendsSidebar />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Portal name='popup' />
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
