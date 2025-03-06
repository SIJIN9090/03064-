import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";

function FindId() {
  const [emailFound, setEmailFound] = useState(""); // 이메일을 찾은 상태를 저장
  const [isEmailVisible, setIsEmailVisible] = useState(false); // 이메일을 보여줄지 여부

  const handleFindEmail = () => {
    // 여기에서 실제 이메일 찾는 로직을 넣을 수 있음
    const foundEmail = "example@email.com"; // 예시 이메일
    setEmailFound(foundEmail);
    setIsEmailVisible(true); // 이메일을 찾으면 폼을 보이도록 설정
  };

  return (
    <FindIdContainer>
          <FindIdBox>
        <FindIdTitle>아이디 찾기</FindIdTitle>
        <FindIdSub>이름과 전화번호를 입력하면 이메일을 찾을 수 있습니다.</FindIdSub>
        </FindIdBox>
      <FindIdSection>
      <div className="logo_t">응급 24시 하이펫 반려동물 전문 메디컬센터</div>
        <FindiIdInput>
          <div>
            <input type="text" placeholder="이름"></input>
            <input type="password" placeholder="전화번호"></input>
          </div>
        </FindiIdInput>

        {isEmailVisible && (
          <FoundEmailSection>
            <p>찾은 이메일은  {emailFound} 입니다.</p>
          </FoundEmailSection>
        )}

        <PwFind>
          <Link to="/findPw">
            <h6>비밀번호찾기 </h6>
          </Link>
        </PwFind>

        <CheckBox>
          <button>확인</button>
        </CheckBox>
      </FindIdSection>
    </FindIdContainer>
  );
}

const FindIdContainer = styled.div`
  width: 1920px;
  min-height: 500px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----------------------------------------------------------------------------------

const FindIdBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  pointer-events: none;
  margin-top: 30px;
  margin-bottom: 30px;

`;


const FindIdTitle = styled.h1`
  font-weight: 700;
  line-height: 1.3em;
  font-size: 42px;
  color: #111;
`;


const FindIdSub = styled.p`
  display: block;
  margin-top: 1.5em;
  color: #888888;
  font-size: 14px;
  text-align: center;
  
`;




const FindIdSection = styled.div`
 max-width: 1280px;
  background-color: #f5f7f9;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 65px 0px;
  width: 800px;

    .logo_t{
    font-size: 24px;
    font-weight: 700;
    color: #0D326F;
    text-align: center;
    //font-family: "Montserrat", serif;
  }
  `;


const FindiIdInput = styled.div`
   margin-top: 60px;
  width: 450px;
  box-sizing: border-box;
  text-align: center;
  

  input {
    width: 450px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
    border-radius: 5px;
    border: 1.5px solid #e0e0e0;
    background-color: #fff;
    outline: none;

    //
    font-size: 14.2px;
    color:  #0D326F;
    font-weight: 400;
  }
    `;

const FoundEmailSection = styled.div`
  margin: 20px 0;
  text-align: center;
   
  p {
    font-size: 18px;
    color: #111111;
  }
`;

const PwFind = styled.div`
   display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #888888;
  width: 420px;
  height: 23px;
  text-align: center;
  margin: 0 auto;
  padding: 50px 40px 20px 40px;
  margin-bottom: 45px;
  `;
const CheckBox = styled.div`

  width: 450px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  border-radius: 5px;
  border: none;
  background-color: #0D326F;
  outline: none;
  
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 85px;
  text-align: center;
  
  &:hover{
    border: 1px solid #FFA228;
    background-color: #FFA228;
  };
`;

export default FindId;
