import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context"; // AuthContext import

const AutoLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); // Context에서 setAuth 가져오기

  useEffect(() => {
    // 페이지를 떠날 때(닫을 때) 로그아웃 처리
    const handleBeforeUnload = (event) => {
      // 페이지가 닫힐 때만 로그아웃 처리
      localStorage.removeItem("access_token");
      localStorage.removeItem("nick_name");
      setAuth(null); // 로그인 상태 초기화
    };

    // 페이지를 닫을 때 발생하는 이벤트
    window.addEventListener("beforeunload", handleBeforeUnload);

    // cleanup: 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setAuth]);

  return null;
};

export default AutoLogout;
