import {
  type Signal,
  component$,
  useContext,
  useSignal,
  $,
  useVisibleTask$,
  useOnWindow,
} from '@builder.io/qwik';
import { PortalCloseAPI } from '@/providers/portal/PortalProvider';
import usePageSize from '@/hooks/pageSize';
import { getSupabaseBrowserClient } from '@/utils/getSupabaseClient';

export default component$<{
  followTo: Signal<HTMLDivElement | undefined>;
}>(({ followTo }) => {
  const popup = useSignal<HTMLDivElement>();
  const portalClose = useContext(PortalCloseAPI);
  const pageSize = usePageSize();

  const adjustPopup = $((): void => {
    if (popup.value && followTo.value) {
      const position = followTo.value.getBoundingClientRect();
      popup.value.style.left = position.left + 'px';
      popup.value.style.bottom = 20 + followTo.value.clientHeight + 'px';
    }
  });

  const isPopupClicked = $((e: Event): boolean => {
    return !!popup.value?.contains(e.target as Node);
  });

  const closePopup = $(async (e: Event): Promise<void> => {
    if (!(await isPopupClicked(e))) {
      await portalClose();
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [popup.value, pageSize.sizes.width, pageSize.sizes.height]);

    adjustPopup();
  });

  useOnWindow('click', closePopup);

  const logout = $(async () => {
    const supabaseClient = getSupabaseBrowserClient();

    try {
      await supabaseClient.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div
      ref={popup}
      class='flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000'
    >
      <div class='w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto'>
        <div class='flex-it flex-grow flex-shrink py-3'>
          <button
            class='flex-it px-4 py-3 text-start transition hover:bg-gray-700'
            onClick$={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
});
