import React from "react";
import axios from "axios";
import styled from "styled-components";

function File({ files, noticeId }) {
  const downloadFile = async (fileId) => {
    try {
      const response = await axios.get(`/api/admin/notice/${noticeId}/file`, {
        params: { fileId },
        responseType: "blob", // 파일을 blob 형식으로 받기
      });

      // 파일 다운로드 처리
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        response.headers["content-disposition"]
          .split("filename=")[1]
          .replace(/"/g, "")
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
    }
  };

  return (
    <FileContainer>
      {files && files.length > 0 ? (
        files.map((file, index) => (
          <div key={index}>
            <FileButton onClick={() => downloadFile(file.id)}>
              {file.name} (다운로드)
            </FileButton>
          </div>
        ))
      ) : (
        <NoFilesMessage>파일이 없습니다.</NoFilesMessage>
      )}
    </FileContainer>
  );
}

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

const NoFilesMessage = styled.p`
  font-size: 16px;
  color: #666;
  font-style: italic;
`;

export default File;
