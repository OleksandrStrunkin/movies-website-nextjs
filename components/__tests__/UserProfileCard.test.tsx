import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfileCard from "../UserProfileCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useUpdateUsernameMutation } from "@/lib/hook/mutations/useUpdateUsernameMutation";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("@/store/useAuthStore");
jest.mock("@/lib/hook/mutations/useUpdateUsernameMutation");

describe("UserProfileCard", () => {
  const mockLogout = jest.fn();
  const mockSetUser = jest.fn();
  const mockPush = jest.fn();

  const user = { username: "John", email: "john@example.com", id: "1" };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: mockLogout,
      setUser: mockSetUser,
      token: "abc",
    });

    (useRouter as unknown as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("allows editing username and saving", async () => {
    const mockMutate = jest.fn((_, { onSuccess }) => {
      onSuccess({ username: "Jane" });
    });

    (useUpdateUsernameMutation as unknown as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null,
    });

    render(<UserProfileCard user={user} />);

    fireEvent.click(screen.getByText("Edit"));

    const input = screen.getByDisplayValue("John") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Jane" } });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {

      expect(mockMutate).toHaveBeenCalledWith(
        { newName: "Jane", token: "abc" },
        expect.any(Object)
      );

      expect(mockSetUser).toHaveBeenCalledWith(
        expect.objectContaining({ username: "Jane" })
      );
    });

    fireEvent.click(screen.getByText("Edit"));
    await waitFor(() =>
      expect(
        screen.getByText(/Name updated successfully!/i)
      ).toBeInTheDocument()
    );
  });

  it("handles logout correctly", async () => {
    (useUpdateUsernameMutation as unknown as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
      error: null,
    });

    render(<UserProfileCard user={user} />);

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(signOut).toHaveBeenCalledWith({ redirect: false });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
