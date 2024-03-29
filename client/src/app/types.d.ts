interface SignupUser {
  username: string
  password: string
  confirmPassword: string
}

type LoginUser = Omit<SignupUser, 'confirmPassword'>;

interface UserProfile {
  id: string
  username: string
  avatar: string
  is_admin: boolean
}

interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
  is_admin: boolean
}
