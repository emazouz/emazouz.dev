import React from "react";
import styled from "styled-components";

const Text = ({ text, size, anotherClass }) => {
  const StyledWrapper = styled.div`
    .text {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      animation: typeAndDelete 4s steps(11) infinite,
        blinkCursor 1s step-end infinite alternate;
      margin-top: 1.5em;
    }

    @keyframes typeAndDelete {
      0%,
      10% {
        width: 0;
      }
      45%,
      55% {
        width: ${size};
      }
      90%,
      100% {
        width: 0;
      }
    }
  `;
  return (
    <StyledWrapper>
      <span className={`text ${anotherClass}`}>{text}</span>
    </StyledWrapper>
  );
};

export default Text;
