export type SnackbarType = 'success' | 'error' | 'warning';

export type SnackbarMessage = {
  message: string;
  type: SnackbarType;
  id: string;
};
