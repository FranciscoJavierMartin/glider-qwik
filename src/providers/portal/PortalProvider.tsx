/* eslint-disable qwik/valid-lexical-scope */
import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  type ContextId,
  type QRL,
  type Signal,
} from '@builder.io/qwik';
import { type JSXNode } from '@builder.io/qwik/jsx-runtime';

export const PortalAPI = createContextId<
  /**
   * Add JSX to a portal.
   * @param name portal name.
   * @param jsx to add.
   * @param contexts to add to the portal.
   * @returns A function used for closing the portal.
   */
  QRL<(name: string, jsx: JSXNode, contexts?: ContextPair<any>[]) => () => void>
>('PortalProviderAPI');

export type ContextPair<T> = { id: ContextId<T>; value: T };

export const PortalCloseAPI =
  createContextId<QRL<() => void>>('PortalCloseAPI');

const Portals = createContextId<Signal<Portal[]>>('Portals');

interface Portal {
  name: string;
  jsx: JSXNode;
  close: QRL<() => void>;
  contexts: Array<ContextPair<unknown>>;
}

export const PortalProvider = component$(() => {
  const portals = useSignal<Portal[]>([]);
  useContextProvider(Portals, portals);

  useContextProvider(
    PortalAPI,
    $((name: string, jsx: JSXNode, contexts?: ContextPair<any>[]) => {
      const portal: Portal = {
        name,
        jsx,
        close: null!,
        contexts: [...(contexts || [])],
      };

      portal.close = $(() => {
        portals.value = portals.value.filter((p) => p !== portal);
      });

      if (!portals.value.some((p) => p.name === name)) {
        portal.contexts.push({ id: PortalCloseAPI, value: portal.close });
        portals.value = [...portals.value, portal];
      }

      return portal.close;
    })
  );

  return <Slot />;
});

/**
 * IMPORTANT: In order for the <Portal> to correctly render in SSR, it needs
 * to be rendered AFTER the call to open portal. (Setting content to portal
 * AFTER the portal is rendered can't be done in SSR, because it is not possible
 * to return back to the <Portal/> after it has been streamed to the client.)
 */
export const Portal = component$<{ name: string }>(({ name }) => {
  const portals = useContext(Portals);
  const myPortals = portals.value.filter((portal) => portal.name === name);

  return (
    <>
      {myPortals.map((portal, index) => (
        <div key={index}>
          <WrapJsxInContext jsx={portal.jsx} contexts={portal.contexts} />
        </div>
      ))}
    </>
  );
});

export const WrapJsxInContext = component$<{
  jsx: JSXNode;
  contexts: Array<ContextPair<any>>;
}>(({ jsx, contexts }) => {
  // eslint-disable-next-line qwik/use-method-usage
  contexts.forEach(({ id, value }) => useContextProvider(id, value));

  return (
    <>
      {/* Workaround: https://github.com/BuilderIO/qwik/issues/4966 */}
      {/* {jsx} */}
      {[jsx].map((jsx) => jsx)}
    </>
  );
});
