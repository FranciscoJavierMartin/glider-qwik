import {
  component$,
  useContext,
  $,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { HiPhotoOutline } from '@qwikest/icons/heroicons';
import { useCreateGlide } from '@/routes/(root)/index@main';
import { AuthContext } from '@/providers/auth/AuthProvider';

export default component$(() => {
  const messengerForm = useSignal<HTMLFormElement>();
  const authState = useContext(AuthContext);
  const createGlide = useCreateGlide();

  const autoSize = $((e: Event) => {
    const element = e.target as HTMLTextAreaElement;

    element.style.height = '0px';
    element.style.height = `${element.scrollHeight}px`;
  });

  useTask$(({ track }) => {
    const success = track(() => createGlide.value?.success);

    if (success && messengerForm.value) {
      messengerForm.value.reset();
    }
  });

  return (
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
      <Form class='flex-it flex-grow' action={createGlide} ref={messengerForm}>
        <div class='flex-it'>
          <textarea
            name='content'
            rows={1}
            id='glide'
            onInput$={(e) => autoSize(e)}
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
              type='submit'
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
      </Form>
      {/* MESSENGER END */}
    </div>
  );
});
