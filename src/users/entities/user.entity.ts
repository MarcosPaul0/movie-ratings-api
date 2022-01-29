export class User {
  id: string;
  username: string;
  email: string;
  password?: string;
  avatar_url: string;
  is_admin: boolean;
  favorite_movie: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
