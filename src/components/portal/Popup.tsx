import {
  $,
  Signal,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { HiEllipsisHorizontalOutline } from '@qwikest/icons/heroicons';
import { PortalCloseAPI, PortalAPI } from './PortalProvider';
// import PopupExampleCSS from './popup-example.css?inline';

export default component$(() => {
  const followTo = useSignal<HTMLDivElement>();
  // Retrieve the portal API
  const portal = useContext(PortalAPI);
  // This function is used to open the modal.
  // Portals can be named and each portal can have multiple items rendered into it.
  const openModal = $(() => {
    portal('popup', <PopupExample followTo={followTo} />);
  });

  return (
    <div
      ref={followTo}
      class='flex-it my-3 items-center flex-row p-3 rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200 cursor-pointer'
      onClick$={openModal}
    >
      <div class='flex-it'>
        <div class='w-10 h-10 overflow-visible'>
          <img
            height={41}
            width={38}
            class='rounded-full'
            src='https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png'
          />
        </div>
      </div>
      <div class='flex-it xl:flex hidden flex-grow flex-row justify-between items-center'>
        <div class='flex-it mx-3 font-bold'>Filip99</div>
        <div class='flex-it'>
          <HiEllipsisHorizontalOutline />
        </div>
      </div>
    </div>
  );
});

// This component is shown as a modal.
export const PopupExample = component$<{
  followTo: Signal<HTMLDivElement | undefined>;
}>(({ followTo }) => {
  const popup = useSignal<HTMLDivElement>();
  // useStylesScoped$(PopupExampleCSS);
  // To close a portal retrieve the close API.
  const portalClose = useContext(PortalCloseAPI);

  useVisibleTask$(({ track }) => {
    track(() => popup.value);

    if (popup.value && followTo.value) {
      const position = followTo.value.getBoundingClientRect();
      popup.value.style.left = position.left + 'px';
      popup.value.style.bottom = 20 + followTo.value.clientHeight + 'px';
    }
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
