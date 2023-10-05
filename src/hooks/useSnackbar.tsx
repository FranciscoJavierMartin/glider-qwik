import { useContext, useVisibleTask$, $ } from '@builder.io/qwik';
import SnackbarContainer from '@/components/snackbar/SnackbarContainer';
import { PortalAPI, PortalCloseAPI } from '@/providers/portal/PortalProvider';
import { UIContext } from '@/providers/ui/UIProvider';

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

  useVisibleTask$(({ cleanup }) => {
    portal('snackbar', <SnackbarContainer />);

    cleanup(async () => {
      // eslint-disable-next-line qwik/use-method-usage
      const portalClose = useContext(PortalCloseAPI);
      await portalClose();
    });
  });

  return { addSnackbar };
};

export default useSnackbar;
