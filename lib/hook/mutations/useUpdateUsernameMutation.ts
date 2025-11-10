import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsername } from "@/lib/api/user";
import { User } from "@/lib/types/users";

interface UpdateUsernameVariables {
  newName: string;
  token: string;
}

interface UpdateUsernameResponse {
  user: User;
  message?: string;
}

export const useUpdateUsernameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateUsernameResponse, Error, UpdateUsernameVariables>({
    mutationFn: ({ newName, token }) => updateUsername(newName, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      console.log("Ok:", data.user.username);
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });
};
