import type { User } from '@/types/user';
import { getSupabaseBrowserClient } from './getSupabaseClient';

export const getUserProfile = async (uid: string): Promise<User> => {
  const supabaseClient = getSupabaseBrowserClient();

  const user = await supabaseClient
    .from('users')
    .select(
      'uid, avatar, followersCount, followingCount, fullName, nickName, email'
    )
    .eq('uid', uid)
    .single();

  const followersId: string[] =
    (
      await supabaseClient
        .from('follow_users')
        .select('followerId')
        .eq('followingId', uid)
    ).data?.map<string>(({ followerId }) => followerId) || [];

  const followingsId: string[] =
    (
      await supabaseClient
        .from('follow_users')
        .select('followingId')
        .eq('followerId', uid)
    ).data?.map<string>(({ followingId }) => followingId) || [];

  return {
    ...user.data!,
    followers: followersId,
    followersCount: followersId.length,
    following: followingsId,
    followingCount: followingsId.length,
  };
};
