import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context"; // AuthContext import

const SessionTimeout = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30분 (밀리초 단위)

  useEffect(() => {
    // 사용자가 활동 중일 때 마지막 활동 시간 업데이트
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    // 사용자 활동 이벤트 리스너 등록
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    // 정기적으로 세션 타임아웃 체크
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      // auth가 null이 아니고 access_token이 있는 경우에만 체크
      if (
        auth &&
        auth.access_token &&
        currentTime - lastActivity > TIMEOUT_DURATION
      ) {
        // 로그아웃 처리
        localStorage.removeItem("access_token");
        localStorage.removeItem("nick_name");
        setAuth(null);

        alert(
          "장시간 활동이 없어 자동 로그아웃 되었습니다. 다시 로그인해주세요."
        );
        navigate("/signIn");
      }
    }, 60000); // 1분마다 체크

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(intervalId);
    };
  }, [auth, lastActivity, navigate, setAuth]);

  return null;
};

export default SessionTimeout;
