import React from "react";
import styled from "styled-components";

const File = (props) => {
  const files = props.files;

  if (!files || files.length === 0) {
    return (
      <FileBox className="file-box">
        <p>No files</p>
      </FileBox>
    );
  }

  return (
    <FileBox>
      <ul>
        {files.map((file) => (
          <li
            key={file.fileId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <a
                href={`/api/member/notice/${file.noticeId}/file/download?fileId=${file.fileId}`}
                download
              >
                Download
              </a>
              &nbsp;
              <strong>File Name:</strong> &nbsp;
              {file.originFileName}
            </span>
          </li>
        ))}
      </ul>
    </FileBox>
  );
};

const FileBox = styled.div`
  border: 2px solid #ccc; /* 테두리 추가 */
  margin: -2px 0px 0px 0px;
  padding: 10px 0px 0px 10px;
  height: auto;
  width: auto; /* 최대 너비 설정 (원하는 크기로 조절) */
`;

export default File;
