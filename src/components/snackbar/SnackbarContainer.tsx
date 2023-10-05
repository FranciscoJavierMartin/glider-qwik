import { component$, useContext } from '@builder.io/qwik';
import Snackbar from './Snackbar';
import { UIContext } from '@/providers/ui/UIProvider';

export default component$(() => {
  const { snackbars } = useContext(UIContext);
  return (
    <div class='fixed z-50 top-0 right-0 p-4 w-full md:max-w-xs'>
      <ul class='flex flex-col space-y-2'>
        {snackbars.map((snackbar) => (
          <Snackbar key={snackbar.id} {...snackbar} />
        ))}
      </ul>
    </div>
  );
});
