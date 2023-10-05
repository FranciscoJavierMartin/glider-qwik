import { useContext, useVisibleTask$, $ } from '@builder.io/qwik';
import SnackbarContainer from '@/components/snackbar/SnackbarContainer';
import { PortalAPI } from '@/providers/portal/PortalProvider';
import { UIContext } from '@/providers/ui/UIProvider';
import type { SnackbarType } from '@/types/snackbar';

const useSnackbar = () => {
  const portal = useContext(PortalAPI);
  const snackbarsState = useContext(UIContext);

  const addSnackbar = $((message: string, type: SnackbarType): void => {
    snackbarsState.snackbars = [
      ...snackbarsState.snackbars,
      {
        id: Math.random().toString(),
        message,
        type,
      },
    ];
  });

  const removeSnackbar = $((id: string): void => {
    snackbarsState.snackbars = snackbarsState.snackbars.filter(
      (snackbar) => snackbar.id !== id
    );
  });

  useVisibleTask$(() => {
    portal('snackbar', <SnackbarContainer />);
  });

  return { addSnackbar, removeSnackbar };
};

export default useSnackbar;
