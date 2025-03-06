import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Update from "../../components/button/Update";
import Back from "../../components/button/Back";

function OnlineCounselUpdate() {
  const location = useLocation();
  const { bbs } = location.state || {}; // location.state에서 bbs가 없을 수 있음
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  // 상태값을 useState로 관리하며 기본값은 빈 문자열로 설정
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // bbs 데이터가 올 때 useEffect로 상태 설정
  useEffect(() => {
    console.log(location.state); // state 확인
    if (bbs) {
      setTitle(bbs.title);
      setContent(bbs.content);
    } else {
      alert("게시글을 찾을 수 없습니다.");
      navigate("/admin/question");
    }
  }, [bbs, navigate]);

  // update 함수
  const update = async () => {
    if (!bbs || !bbs.id) {
      alert("잘못된 요청입니다.");
      return;
    }

    try {
      await axios.patch(`/api/question/${bbs.id}`, {
        title: title,
        content: content,
      });
      alert("수정되었습니다.");
      navigate(`/question/${bbs.id}`); // 수정 후 질문 상세 페이지로 이동
    } catch (error) {
      console.error("Error updating question:", error);
      alert("수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 제목 변경
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  // 내용 변경
  const changeContent = (event) => {
    setContent(event.target.value);
  };

  // 취소 버튼 클릭 시
  const handleCancelClick = () => {
    if (bbs && bbs.id) {
      navigate(`/admin/question/${bbs.id}`); // 취소 시 해당 질문의 디테일 페이지로 이동
    } else {
      navigate("/admin/question"); // bbs가 없다면 질문 목록으로 이동
    }
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
          <Update bbs={bbs} />
          <Back pageNumber={pageNumber} itemId={bbs.id} />
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
export default OnlineCounselUpdate;
