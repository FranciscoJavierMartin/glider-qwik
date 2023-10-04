export interface User {
  uid: string;
  nickName: string;
  fullName: string;
  email: string;
  avatar: string;
  followers: string[];
  following: string[];
  followersCount: number;
  followingCount: number;
}