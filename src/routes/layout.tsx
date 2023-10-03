import { Slot, component$ } from '@builder.io/qwik';
import { type DocumentHead, type RequestHandler } from '@builder.io/qwik-city';
import MainSidebar from '@/components/sidebars/Main';
import TrendsSidebar from '@/components/sidebars/Trends';
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
