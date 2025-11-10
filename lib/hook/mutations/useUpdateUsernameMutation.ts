import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsername } from "@/lib/api/user";
import { User } from "@/lib/types/users";

interface UpdateUsernameVariables {
  newName: string;
  token: string;
}

interface UpdateUsernameResponse {
  username: string;
  message: string;
}

export const useUpdateUsernameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateUsernameResponse, Error, UpdateUsernameVariables>({
    mutationFn: ({ newName, token }) => updateUsername(newName, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });
};
