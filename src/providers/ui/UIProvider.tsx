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
    snackbars: [],
  });
  useContextProvider(UIContext, uiContextState);

  return <Slot />;
});
