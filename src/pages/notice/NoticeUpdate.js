import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function NoticeUpdate() {
  const location = useLocation();
  const { bbs } = location.state || {};
  console.log(bbs);
  // const boardId = bbs.boardId;
  const [title, setTitle] = useState(bbs.title);
  const [content, setContent] = useState(bbs.content);
  const navigate = useNavigate();

  const update = async () => {
    try {
      await axios.patch(`/api/admin/notice/${bbs.id}`, {
        title: title,
        content: content,
      });
      alert("수정되었습니다.");
      navigate(`/admin/notice/${bbs.id}`);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  //changeTitle
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  //changeContent
  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const handleCancelClick = () => {
    navigate(`/notice/${bbs.id}`); // 취소 시 해당 공지의 디테일 페이지로 이동
  };

  return (
    <Container>
      <ContentWrapper>
        <TableBox>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TableTitle
                    type="text"
                    value={title}
                    onChange={changeTitle}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TableContent value={content} onChange={changeContent} />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableBox>

        <BottomBox>
          <Button onClick={update}>확인</Button>
          <Button onClick={handleCancelClick}>취소</Button>
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

//  컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//  내부 콘텐츠
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

//  테이블 박스
const TableBox = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// 테이블
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

//  입력 필드
const TableTitle = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #111111;
  font-size: 20px;
  font-weight: medium;
  font-family: "Noto Sans KR", serif;
  margin-bottom: 30px;

  outline: none;
`;

const TableContent = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: 5px;
  border: none;
  font-size: 16px;
  font-weight: 300;
  font-family: "Noto Sans KR", serif;
  border: none;
  border-bottom: 1px solid #111111;
  outline: none;
  resize: none;
  overflow-x: hidden;
`;

//  하단 버튼 박스
const BottomBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 100px;
`;

// 버튼 스타일
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #111111;
  color: white;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #111111;
  }
`;
export default NoticeUpdate;
