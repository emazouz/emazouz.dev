import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <StyledWrapper>
        <div className="spinner flex items-center justify-center h-14 w-fit text-3xl font-semibold tracking-[1rem] text-[#f5f5f5]">
          <span>M</span>
          <span>A</span>
          <span>Z</span>
          <span>O</span>
          <span>U</span>
          <span>Z</span>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .spinner {
    filter: drop-shadow(0 0 10px);
  }

  .spinner span {
    animation: loading6454 1.75s ease infinite;
  }

  .spinner span:nth-child(2) {
    animation-delay: 0.25s;
  }

  .spinner span:nth-child(3) {
    animation-delay: 0.5s;
  }

  .spinner span:nth-child(4) {
    animation-delay: 0.75s;
  }

  .spinner span:nth-child(5) {
    animation-delay: 1s;
  }

  .spinner span:nth-child(6) {
    animation-delay: 1.25s;
  }

  .spinner span:nth-child(7) {
    animation-delay: 1.5s;
  }

  @keyframes loading6454 {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }
`;

export default Loader;
