import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import type { Glide } from '@/types/glide';

export const onGet: RequestHandler = async (requestEvent: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(requestEvent);
  const nextGlide: number = +(requestEvent.query.get('nextGlide') || 0);

  const response = await supabaseClient
    .from('glides')
    .select(
      'id, content, likesCount, subglidesCount, date, user:users (nickName, avatar)'
    )
    .order('date', { ascending: false })
    .range(nextGlide, nextGlide + 10)
    .returns<Glide[]>();

  const glides = response.data || [];

  requestEvent.json(200, {
    glides,
    nextGlide: nextGlide + glides.length,
    isLastGlide: glides.length < 10,
  });
};
