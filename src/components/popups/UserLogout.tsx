import {
  type Signal,
  component$,
  useContext,
  useSignal,
  $,
  useVisibleTask$,
} from '@builder.io/qwik';
import { PortalCloseAPI } from '../../providers/portal/PortalProvider';

export default component$<{
  followTo: Signal<HTMLDivElement | undefined>;
}>(({ followTo }) => {
  const popup = useSignal<HTMLDivElement>();
  const portalClose = useContext(PortalCloseAPI);

  const adjustPopup = $((): void => {
    if (popup.value && followTo.value) {
      const position = followTo.value.getBoundingClientRect();
      popup.value.style.left = position.left + 'px';
      popup.value.style.bottom = 20 + followTo.value.clientHeight + 'px';
    }
  });

  const isPopupClicked = $((e: MouseEvent): boolean => {
    return !!popup.value?.contains(e.target as Node);
  });

  const closePopup = $(async (e: MouseEvent): Promise<void> => {
    if (!(await isPopupClicked(e))) {
      await portalClose();
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => popup.value);

    adjustPopup();
  });

  useVisibleTask$(({ cleanup }) => {
    window.addEventListener('resize', adjustPopup);
    window.addEventListener('click', closePopup);

    cleanup(() => {
      window.removeEventListener('resize', adjustPopup);
      window.removeEventListener('click', closePopup);
    });
  });

  return (
    <div
      ref={popup}
      class='flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000'
    >
      <div class='w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto'>
        <div class='flex-it flex-grow flex-shrink py-3'>
          <div class='flex-it px-4 py-3 transition hover:bg-gray-700'>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
});
