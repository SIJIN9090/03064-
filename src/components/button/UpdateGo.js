import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HttpHeadersContext } from "../../context"; // HttpHeadersContext import

function UpdateGo() {
  const { setHeaders } = useContext(HttpHeadersContext); // setHeaders 가져오기
  const { noticeId, questionId } = useParams(); // noticeId와 questionId 받기
  const navigate = useNavigate();
  const location = useLocation();
  const [notice, setNotice] = useState(null); // notice 상태 추가
  const [question, setQuestion] = useState(null); // question 상태 추가

  // 게시글 상세 데이터를 가져오는
  //  함수 (공지사항과 질문을 구분하여 처리)
  const getBbsDetail = async () => {
    try {
      if (noticeId) {
        const response = await axios.get(`/api/notice/${noticeId}`);
        setNotice(response.data); // 받아온 데이터를 notice 상태에 저장
      } else if (questionId) {
        const response = await axios.get(`/api/question/${questionId}`);
        setQuestion(response.data); // 받아온 데이터를 question 상태에 저장
      }
    } catch (error) {
      console.error("getBbsDetail() error:", error);
    }
  };

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    });
    getBbsDetail();
  }, [noticeId, questionId, setHeaders]);

  useEffect(() => {
    if (location.state) {
      console.log(location.state); // state 확인
      if (location.state.bbs) {
        setNotice(location.state.bbs);
      }
      if (location.state.question) {
        setQuestion(location.state.question);
      }
    }
  }, [location.state]);

  const handleEditClick = async () => {
    try {
      let apiUrl = "";
      let redirectUrl = "";

      if (noticeId) {
        // 공지사항 업데이트 페이지로 이동
        apiUrl = `/api/notice/${noticeId}`;
        redirectUrl = `/admin/notice/${noticeId}`;
      } else if (questionId) {
        // 질문 업데이트 페이지로 이동
        apiUrl = `/api/question/${questionId}`;
        redirectUrl = location.pathname.includes("/admin")
          ? `/admin/question/${questionId}`
          : `/question/${questionId}`;
      }

      // 수정 요청 보내기
      const response = await axios.put(apiUrl, {
        // 요청에 필요한 데이터 (예: title, content 등)
        title: "새로운 제목",
        content: "수정된 내용",
      });

      if (response.status === 200) {
        alert("수정되었습니다.");
        navigate(redirectUrl);
      } else {
        throw new Error("수정 실패");
      }
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다. 다시 시도해 주세요.");
      // 실패 시 해당 게시글 상세 페이지로 이동
      if (noticeId) {
        navigate(`/admin/notice/${noticeId}`);
      } else if (questionId) {
        // 어드민 페이지인지 확인 후 이동
        if (location.pathname.includes("/admin")) {
          navigate(`/admin/question/${questionId}`); // 어드민 페이지로 이동
        } else {
          navigate(`/question/${questionId}`); // 일반 페이지로 이동
        }
      }
    }
  };

  return <Button onClick={handleEditClick}>수정</Button>;
}

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
export default UpdateGo;
