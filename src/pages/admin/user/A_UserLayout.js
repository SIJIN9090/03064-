import { Outlet } from "react-router-dom";
import styled from "styled-components";

function A_UserLayout() {
  return (
    <Container>  
        <Outlet /> {/* 여기에 Notice, NoticeWrite, NoticeUpdate가 렌더링됨 */}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default A_UserLayout;
