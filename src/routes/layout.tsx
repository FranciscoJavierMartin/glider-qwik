import { Slot, component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Portal, PortalProvider } from '@/providers/portal/PortalProvider';
import AuthProvider from '@/providers/auth/AuthProvider';
import UIProvider from '@/providers/ui/UIProvider';

// TODO: Try AuthWrapper
export default component$(() => {
  return (
    <UIProvider>
      <AuthProvider>
        <PortalProvider>
          <Slot />
          <Portal name='popup' />
          <Portal name='snackbar' />
        </PortalProvider>
      </AuthProvider>
    </UIProvider>
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
