import { $, useSignal, useStore } from '@builder.io/qwik';
import type { Glide } from '@/types/glide';

type GlideStore = {
  pages: {
    [key: string]: { glides: Glide[] };
  };
};

const initialStore: GlideStore = { pages: {} };

const useGlides = () => {
  const pageNumber = useSignal<number>(1);
  const glideStore = useStore<GlideStore>(initialStore);

  const loadGlides = $(async () => {
    try {
      // TODO: Change url
      const response = await fetch('http://localhost:3501/api/glides');
      const { glides } = await response.json();

      if (glides.length) {
        glideStore.pages = {
          ...glideStore.pages,
          [pageNumber.value]: { glides },
        };
      }
    } catch (error) {
      console.log(error);
    }
  });

  return { loadGlides, pageNumber, glideStore };
};

export default useGlides;
