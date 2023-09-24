import { component$ } from '@builder.io/qwik';
import { HiArrowPathOutline } from '@qwikest/icons/heroicons';

export default component$(() => {
  return (
    <div class='flex-it text-white justify-center items-center h-full'>
      <div class='rotating'>
        <HiArrowPathOutline class='h-16 w-16' />
      </div>
    </div>
  );
});
