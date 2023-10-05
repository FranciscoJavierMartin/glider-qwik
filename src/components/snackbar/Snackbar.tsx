import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='min-w-68 text-white flex-it font-bold rounded-md md:max-w-xs w-full text-sm shadow-md bg-blue-400'>
      <div class='flex-it flex-row-reverse p-1'>
        <button class='text-xl rounded-full'>X</button>
      </div>
      <div class='flex-it px-2 pb-3'>Hello world</div>
      <div
        role='progressbar'
        style={{ width: `${100}%` }}
        class='bg-black opacity-40 text-right h-2'
      ></div>
    </div>
  );
});
