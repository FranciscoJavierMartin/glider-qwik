import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { HiEllipsisHorizontalOutline } from '@qwikest/icons/heroicons';
import { PortalAPI } from '../../providers/portal/PortalProvider';
import UserLogout from '@/components/popups/UserLogout';

export default component$(() => {
  const followTo = useSignal<HTMLDivElement>();
  const portal = useContext(PortalAPI);

  const openPopup = $(() => {
    portal('popup', <UserLogout followTo={followTo} />);
  });

  return (
    <div
      ref={followTo}
      class='flex-it my-3 items-center flex-row p-3 rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200 cursor-pointer'
      onClick$={openPopup}
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
