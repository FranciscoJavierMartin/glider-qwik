import { component$, $, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { HiXMarkOutline } from '@qwikest/icons/heroicons';
import type { SnackbarMessage } from '@/types/snackbar';
import useSnackbar from '@/hooks/useSnackbar';

type SnackbarProps = SnackbarMessage & { autoHideDuration?: number };

export default component$<SnackbarProps>((props) => {
  const duration = useSignal<number>(props.autoHideDuration || 2000);
  const { removeSnackbar } = useSnackbar();

  const remove = $(async () => {
    await removeSnackbar(props.id);
  });

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => [duration.value]);

    const timer = setInterval(() => {
      duration.value -= 50;
    }, 50);

    if (duration.value <= 0) {
      await remove();
      clearInterval(timer);
    }

    cleanup(() => clearInterval(timer));
  });

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
        <button class='text-xl rounded-full' onClick$={remove}>
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
