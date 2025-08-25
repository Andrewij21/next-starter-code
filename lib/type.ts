import type { User } from "@/schemas/userSchema";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
