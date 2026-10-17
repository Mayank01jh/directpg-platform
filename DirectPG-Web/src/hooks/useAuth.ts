import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authService, LoginDto, RegisterDto } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { ROUTES } from "@/constants";

export function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: (res) => {
      if (res.success) {
        setUser(res.data.user, res.data.accessToken);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        router.push(ROUTES.HOME);
      }
    },
    onError: (err: any) => toast.error(err?.message || "Login failed"),
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterDto) => authService.register(data),
    onSuccess: (res) => {
      if (res.success) {
        setUser(res.data.user, res.data.accessToken);
        toast.success("Account created successfully!");
        router.push(ROUTES.HOME);
      }
    },
    onError: (err: any) => toast.error(err?.message || "Registration failed"),
  });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  return () => {
    authService.logout().catch(() => {});
    clearAuth();
    router.push(ROUTES.HOME);
    toast.success("Logged out successfully");
  };
}
