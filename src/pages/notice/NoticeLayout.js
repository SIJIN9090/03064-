import { Outlet } from "react-router-dom";
import styled from "styled-components";

function NoticeLayout() {
  return (
    <Container>
        <LoginBox>
          <LoginTitle>공지사항</LoginTitle>
          <LoginSub>하이펫병원의 새로운 소식을 확인하세요.</LoginSub>
          <Outlet /> {/* 여기에 Notice, NoticeWrite, NoticeUpdate가 렌더링됨 */}
        </LoginBox>
       
    </Container>
  );
}

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 60px;
  margin-bottom: 30px;
`;
const LoginTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
  text-align: center;
`;
const LoginSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
`;


const NoticeTitle = styled.div`
  width: 1000px;

  margin-top: 100px;
  text-align: left;
  h1 {
    font-weight: bold;
    font-size: 36px;
    font-family: "Noto Sans KR", serif;
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default NoticeLayout;
