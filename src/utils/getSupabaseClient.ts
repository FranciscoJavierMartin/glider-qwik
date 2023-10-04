import type { RequestEventAction, RequestEvent } from '@builder.io/qwik-city';
import {
  type SupabaseClient,
  createServerClient,
  createBrowserClient,
} from 'supabase-auth-helpers-qwik';

export const getSupabaseServerClient = (
  request: RequestEvent | RequestEventAction
): SupabaseClient<any, 'public', any> => {
  return createServerClient(
    request.env.get('PUBLIC_SUPABASE_URL')!,
    request.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    request
  );
};

const supabaseClient = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export const getSupabaseBrowserClient = (): SupabaseClient<
  any,
  'public',
  any
> => {
  return supabaseClient;
};
