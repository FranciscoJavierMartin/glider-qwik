import { component$ } from '@builder.io/qwik';
import { HiXMarkOutline } from '@qwikest/icons/heroicons';
import type { SnackbarMessage } from '@/types/snackbar';

type SnackbarProps = SnackbarMessage;

export default component$<SnackbarProps>((props) => {
  return (
    <div
      class={[
        'min-w-68',
        'text-white',
        'flex-it',
        'font-bold',
        'rounded-md',
        'md:max-w-xs',
        'w-full',
        'text-sm',
        'shadow-md',
        { 'bg-blue-400': props.type === 'success' },
        { 'bg-red-700': props.type === 'error' },
        { 'bg-yellow-500': props.type === 'warning' },
      ]}
    >
      <div class='flex-it flex-row-reverse p-1'>
        <button class='text-xl rounded-full'>
          <HiXMarkOutline />
        </button>
      </div>
      <div class='flex-it px-2 pb-3'>{props.message}</div>
      <div
        role='progressbar'
        style={{ width: `${100}%` }}
        class='bg-black opacity-40 text-right h-2'
      />
    </div>
  );
});
