import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { HiPhotoOutline } from '@qwikest/icons/heroicons';
import GlidePost from '@/components/glides/GlidePost';
import { AuthContext } from '@/providers/auth/AuthProvider';
import type { Glide } from '@/types/glide';
import useSnackbar from '@/hooks/useSnackbar';

export default component$(() => {
  const content = useSignal<string>('');
  const glides = useSignal<Glide[]>([]);
  const authState = useContext(AuthContext);
  useSnackbar()

  const createGlide = $(() => {
    // glides.value = [
    //   {
    //     content: content.value,
    //     date: new Date(),
    //     id: Math.random().toString(16).slice(2),
    //     likesCount: 0,
    //     subglidesCount: 0,
    //     user: {
    //       nickName: 'John',
    //       avatar:
    //         'https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png',
    //     },
    //   },
    //   ...glides.value,
    // ];

    content.value = '';
  });

  return (
    <>
      <div class='flex-it py-1 px-4 flex-row'>
        <div class='flex-it mr-4'>
          <div class='w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80'>
            <img
              height={50}
              width={45}
              class='rounded-full'
              src={authState.user?.avatar}
            />
          </div>
        </div>
        {/* MESSENGER START */}
        <div class='flex-it flex-grow'>
          <div class='flex-it'>
            <textarea
              bind:value={content}
              name='content'
              rows={1}
              id='glide'
              class='bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0'
              placeholder={"What's new?"}
            />
          </div>
          <div class='flex-it mb-1 flex-row xs:justify-between items-center'>
            <div class='flex-it mt-3 mr-3 cursor-pointer text-white hover:text-blue-400 transition'>
              <div class='upload-btn-wrapper'>
                <HiPhotoOutline class='cursor-pointer h-5 w-5' />
                <input type='file' name='myfile' />
              </div>
            </div>
            <div class='flex-it w-32 mt-3 cursor-pointer'>
              <button
                onClick$={createGlide}
                type='button'
                class='
                        disabled:cursor-not-allowed disabled:bg-gray-400
                        bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200'
              >
                <div class='flex-it flex-row text-sm font-bold text-white items-start justify-center'>
                  <span>Glide It</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* MESSENGER END */}
      </div>
      <div class='h-px bg-gray-700 my-1' />
      {/* GLIDE POST START */}
      {glides.value.map((glide) => (
        <GlidePost glide={glide} key={glide.id} />
      ))}
    </>
  );
});
