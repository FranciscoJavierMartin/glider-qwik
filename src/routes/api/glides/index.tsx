import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async (requestEvent: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(requestEvent);

  const response = await supabaseClient
    .from('glides')
    .select(
      'id, content, likesCount, subglidesCount, date, user:users (nickName, avatar)'
    )
    .order('date', { ascending: false })
    .limit(10);

  const glides = response.data;

  requestEvent.json(200, { glides });
};
