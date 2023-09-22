import { component$ } from '@builder.io/qwik';
import {
  HiEllipsisHorizontalCircleOutline,
  HiEllipsisHorizontalOutline,
  HiHomeOutline,
  HiUserCircleOutline,
  HiBellOutline,
  HiMapOutline,
  HiPencilSquareOutline,
} from '@qwikest/icons/heroicons';

export default component$(() => {
  return (
    <header class='lg:flex-grow flex-it items-end'>
      <div class='xl:w-80 w-20 flex-it'>
        <div class='h-full fixed flex-it top-0'>
          <div class='flex-it h-full xl:w-80 w-20 overflow-y-auto px-3 justify-between'>
            <div class='flex-it items-center xl:items-start'>
              <div class='p-3 pt-4 xl:pb-3 pb-0 xl:text-2xl text-sm font-bold transition duration-200 hover:opacity-80'>
                <a href='#'>
                  <h1>Glider</h1>
                </a>
              </div>
              <div class='my-1 w-full flex-it'>
                <nav class='flex-it items-start'>
                  <a class='flex-it items-start flex-grow w-full' href='#'>
                    <div class='p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200'>
                      <div class='flex-it'>
                        <HiHomeOutline />
                      </div>
                      <div class='mx-4 text-2xl truncate xl:block hidden'>
                        <span class='truncate'>Home</span>
                      </div>
                    </div>
                  </a>
                  <a class='flex-it items-start flex-grow w-full' href='#'>
                    <div class='p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200'>
                      <div class='flex-it'>
                        <HiUserCircleOutline />
                      </div>
                      <div class='mx-4 text-2xl truncate xl:block hidden'>
                        <span class='truncate'>Profile</span>
                      </div>
                    </div>
                  </a>
                  <a class='flex-it items-start flex-grow w-full' href='#'>
                    <div class='p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200'>
                      <div class='flex-it'>
                        <HiEllipsisHorizontalCircleOutline />
                      </div>
                      <div class='mx-4 text-2xl truncate xl:block hidden'>
                        <span class='truncate'>More</span>
                      </div>
                    </div>
                  </a>
                  <a class='flex-it items-start flex-grow w-full' href='#'>
                    <div class='p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200'>
                      <div class='flex-it'>
                        <HiBellOutline />
                      </div>
                      <div class='mx-4 text-2xl truncate xl:block hidden'>
                        <span class='truncate'>Notification</span>
                      </div>
                    </div>
                  </a>
                  <a class='flex-it items-start flex-grow w-full' href='#'>
                    <div class='p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200'>
                      <div class='flex-it'>
                        <HiMapOutline />
                      </div>
                      <div class='mx-4 text-2xl truncate xl:block hidden'>
                        <span class='truncate'>Discover</span>
                      </div>
                    </div>
                  </a>
                </nav>
              </div>
              {/* GLIDER SEND-MESSAGE BUTTON */}
              <div class='my-1 flex-it w-10/12 cursor-pointer'>
                <div class='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition hidden xl:flex'>
                  <div class='flex-it flex-row text-xl font-bold text-white items-start justify-center truncate duration-200'>
                    <div>Glide It</div>
                  </div>
                </div>
                <button class='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition h-8 w-8 flex justify-center items-center xl:hidden'>
                  <HiPencilSquareOutline class='h-5 w-5' />
                </button>
              </div>
            </div>
            {/* PROFILE MENU */}
            <div class='flex-it my-3 hover:cursor-pointer'>
              {/* POPUP START*/}
              <div class='flex-it items-center flex-row p-3 rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200 cursor-pointer'>
                <div class='flex-it'>
                  <div class='w-10 h-10 overflow-visible'>
                    <img
                      height={41}
                      width={38}
                      class='rounded-full'
                      src='https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png'
                    ></img>
                  </div>
                </div>
                <div class='flex-it xl:flex hidden flex-grow flex-row justify-between items-center'>
                  <div class='flex-it mx-3 font-bold'>Filip99</div>
                  <div class='flex-it'>
                    <HiEllipsisHorizontalOutline />
                  </div>
                </div>
              </div>
              {/* POPUP END */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
