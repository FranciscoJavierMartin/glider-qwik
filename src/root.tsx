import { component$, useVisibleTask$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
  useNavigate,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { getSupabaseBrowserClient } from './utils/getSupabaseClient';

import './global.css';

export default component$(() => {
  const navigate = useNavigate();

  useVisibleTask$(() => {
    const supabaseClient = getSupabaseBrowserClient();

    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id) {
        navigate('/', { forceReload: true });
      } else {
        navigate('/login', { forceReload: true });
      }
    });
  });
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <link rel='manifest' href='/manifest.json' />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang='en'>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
