import type { User } from '@/types/user';

export interface Glide {
  id: string;
  content: string;
  user: Partial<User>;
  likesCount: number;
  subglidesCount: number;
  date: Date;
}
