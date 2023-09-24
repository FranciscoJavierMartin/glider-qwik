import { useStore, $, useOnWindow, useComputed$ } from '@builder.io/qwik';

const usePageSize = () => {
  const sizes = useStore({
    height: 0,
    width: 0,
  });

  const handleResize = $(() => {
    sizes.height = document.body.clientHeight;
    sizes.width = document.body.clientWidth;
  });

  useOnWindow(
    'resize',
    $(() => {
      handleResize();
    })
  );

  const isXL = useComputed$<boolean>(() => sizes.width > 1280);
  const isLG = useComputed$<boolean>(() => sizes.width > 1024);

  return { sizes, isLG, isXL };
};

export default usePageSize;
