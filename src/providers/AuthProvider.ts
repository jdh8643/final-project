import { useEffect } from "react";
import supabase from "../utils/supabase";
import { useAuthStore } from "../store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // 초기 사용자 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          nickname: session.user.user_metadata.nickname || "",
        });
      }
    });

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          nickname: session.user.user_metadata.nickname || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return children;
}
