import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { syncGoogleUser } from "@/lib/api/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useGoogleSync = () => {
  const { setUser, setToken } = useAuthStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user && session.user.email && session.user.name) {
      syncGoogleUser({
        email: session.user.email,
        username: session.user.name,
      })
        .then((data) => {
          setUser(data.user);
          setToken(data.token);
          router.push("/profile");
        })
        .catch((err) => console.error("Google login backend error:", err));
    }
  }, [session, setUser, setToken, router]);
};
