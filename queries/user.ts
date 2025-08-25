import { apiClient } from "@/lib/api";
import type { ApiResponse } from "@/lib/type";
import type {
  CreateUserSchema,
  UpdateUserSchema,
  User,
} from "@/schemas/userSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUsers = async (): Promise<ApiResponse<User[]>> => {
  return await apiClient.get("/users");
};
const getUser = async (userId: string): Promise<ApiResponse<User[]>> => {
  return await apiClient.get(`/users/${userId}`);
};
const createUser = async (
  user: CreateUserSchema
): Promise<ApiResponse<User[]>> => {
  return await apiClient.post("/users", user);
};

const updateUser = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: UpdateUserSchema;
}): Promise<ApiResponse<User>> => {
  return await apiClient.patch(`/users/${userId}`, userData);
};
const deleteUser = async (userId: string): Promise<ApiResponse<User[]>> => {
  return await apiClient.delete(`/users/${userId}`);
};
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (userId: string) => [...userKeys.all, "detail", userId] as const,
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
  });
};

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser, // This function now correctly expects a single argument
    onSuccess: (data, variables) => {
      // The `variables` here will be the single object you pass to `mutate`
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.setQueryData(userKeys.detail(variables.userId), data);
    },
  });
};
