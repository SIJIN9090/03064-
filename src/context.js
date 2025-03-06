import { createContext, useState, useEffect } from "react";

// AuthContext: 인증 관련 상태 관리
export const AuthContext = createContext();

// HttpHeadersContext: HTTP 헤더 관리 (예: Authorization 헤더)
export const HttpHeadersContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // 로컬스토리지에서 닉네임과 토큰을 읽어옴
    const nickName = localStorage.getItem("nick_name");
    const token = localStorage.getItem("access_token");
    return { nick_name: nickName, access_token: token };
  });
  useEffect(() => {
    if (auth.nick_name) {
      localStorage.setItem("nick_name", auth.nick_name);
    }
    if (auth.token) {
      localStorage.setItem("access_token", auth.token);
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const HttpHeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState({});

  return (
    <HttpHeadersContext.Provider value={{ headers, setHeaders }}>
      {children}
    </HttpHeadersContext.Provider>
  );
};
