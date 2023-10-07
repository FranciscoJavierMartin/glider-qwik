import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async (requestEvent: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(requestEvent);

  const response = await supabaseClient
    .from('glides')
    .select('*')
    .order('date', { ascending: false })
    .limit(10);

  const glides = response.data;

  console.log(glides?.length);

  requestEvent.json(200, { glides });
};
