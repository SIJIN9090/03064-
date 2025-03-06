import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HttpHeadersContext } from "../../context"; // HttpHeadersContext import

function Update() {
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
export default Update;
