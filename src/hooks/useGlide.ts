import { $, useSignal, useStore } from '@builder.io/qwik';
import type { Glide } from '@/types/glide';

type GlideStore = {
  pages: {
    [key: string]: { glides: Glide[] };
  };
  nextGlide: number;
  isLastGlide: boolean;
};

const initialStore: GlideStore = {
  pages: {},
  nextGlide: 0,
  isLastGlide: false,
};

const useGlides = () => {
  const pageNumber = useSignal<number>(1);
  const glideStore = useStore<GlideStore>(initialStore);

  const loadGlides = $(async () => {
    if (!glideStore.isLastGlide) {
      try {
        // TODO: Change url
        const response = await fetch(
          `http://localhost:3501/api/glides?nextGlide=${glideStore.nextGlide}`
        );
        const { glides, nextGlide, isLastGlide } = await response.json();

        if (glides.length) {
          glideStore.pages = {
            ...glideStore.pages,
            [pageNumber.value]: { glides },
          };

          glideStore.nextGlide = nextGlide;
        }
        
        pageNumber.value++;
        glideStore.isLastGlide = isLastGlide;
      } catch (error) {
        console.log(error);
      }
    }
  });

  const addGlide = $((glide: Glide | null) => {
    const page = 1;
    if (glide) {
      if (glideStore.pages[page]) {
        glideStore.pages[page] = { glides: [] };
      }

      glideStore.pages[page].glides = [glide, ...glideStore.pages[page].glides];
    }
  });

  return { loadGlides, pageNumber, glideStore, addGlide };
};

export default useGlides;
