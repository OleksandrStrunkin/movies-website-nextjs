import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsername } from "@/lib/api/user";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });
};
