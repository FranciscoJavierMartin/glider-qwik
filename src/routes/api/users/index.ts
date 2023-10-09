import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { getSupabaseServerClient } from '@/utils/getSupabaseClient';
import type { User } from '@/types/user';

export const onGet: RequestHandler = async (requestEvent: RequestEvent) => {
  const supabaseClient = getSupabaseServerClient(requestEvent);
  const authUserId = (await supabaseClient.auth.getSession()).data.session?.user
    .id;
  let users: User[] = [];

  if (authUserId) {
    const response = await supabaseClient
      .from('users')
      .select(
        'uid, avatar, followersCount, followingCount, fullName, nickName, email'
      )
      .neq('uid', authUserId)
      .returns<User[]>();

    users = response.data || [];
  }

  requestEvent.json(200, users);
};
