import { component$ } from '@builder.io/qwik';
import Snackbar from './Snackbar';

export default component$(() => {
  return (
    <div class='fixed z-50 top-0 right-0 p-4 w-full md:max-w-xs'>
      <ul class='flex flex-col space-y-2'>
        <Snackbar />
      </ul>
    </div>
  );
});
