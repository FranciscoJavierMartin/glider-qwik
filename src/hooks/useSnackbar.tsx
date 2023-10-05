/* eslint-disable qwik/use-method-usage */
import SnackbarContainer from '@/components/snackbar/SnackbarContainer';
import { PortalAPI } from '@/providers/portal/PortalProvider';
import { UIContext } from '@/providers/ui/UIProvider';
import { useContext, useVisibleTask$, $ } from '@builder.io/qwik';

const useSnackbar = () => {
  const portal = useContext(PortalAPI);
  const snackbarsState = useContext(UIContext);

  const addSnackbar = $(() => {
    snackbarsState.snackbars = [
      ...snackbarsState.snackbars,
      {
        id: Math.random().toString(),
        message: `Message ${Math.random()}`,
        type: 'success',
      },
    ];
  });

  useVisibleTask$(() => {
    portal('snackbar', <SnackbarContainer />);
  });

  return { addSnackbar };
};

export default useSnackbar;
