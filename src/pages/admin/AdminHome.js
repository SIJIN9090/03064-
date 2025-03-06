import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("users");

  const menuItems = [
    { title: "회원 관리", key: "adminuser", path: "adminuser" },
    { title: "공지사항 관리", key: "notice", path: "notice" },
    { title: "온라인예약 관리", key: "reservations", path: "a_reservation" },
    { title: "온라인상담 관리", key: "onlineCounsel", path: "question" },
    { title: "고객 리뷰 관리", key: "review", path: "review" },
  ];

  // const getHomeTitle = () => {
  //   const currentItem = menuItems.find((item) => item.key === selectedMenu);
  //   return currentItem ? currentItem.title : "";
  // };
  const linkPrefix1 = "/admin/";
  return (
    <LayoutContainer>
      {/* 사이드바 */}
      <Sidebar>
        <SidebarTitle>Admin</SidebarTitle>
        <SidebarMenu>
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={selectedMenu === item.key ? "active" : ""}
              onClick={() => setSelectedMenu(item.key)}
            >
              <Link to={`/admin/${item.path}`}>{item.title}</Link>
            </li>
          ))}
        </SidebarMenu>
      </Sidebar>

      {/* 자식 페이지가 렌더링되는 영역 */}
      <ContentArea>
        {/* <h1>{getHomeTitle()}</h1> */}
        <Outlet />
        {/* 자식 Route가 여기에 렌더링됩니다. */}
      </ContentArea>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
   width: 1280px;
   margin: 0 auto;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #111111;
  color: white;
  padding: 20px;
`;

const SidebarTitle = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 10px 0;
    cursor: pointer;

    &.active {
      background-color: #444;
    }

    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const ContentArea = styled.div`
  flex: 1;

  width: 1200px;
  transform: scale(1);

`;

export default AdminLayout;
