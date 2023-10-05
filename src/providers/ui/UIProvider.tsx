import type { SnackbarMessage } from '@/types/snackbar';
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

type UIContextState = {
  snackbars: SnackbarMessage[];
};

export const UIContext = createContextId<UIContextState>('ui-context');

export default component$(() => {
  const uiContextState = useStore<UIContextState>({
    snackbars: [
      { id: '1', message: 'Message 1', type: 'success' },
      { id: '2', message: 'Message 2', type: 'error' },
      { id: '3', message: 'Message 3', type: 'warning' },
    ],
  });
  useContextProvider(UIContext, uiContextState);

  return <Slot />;
});
