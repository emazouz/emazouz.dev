import React from "react";
import styled from "styled-components";

const Loader = ({ children }) => {
  return (
    <StyledWrapper className="w-full">
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">+</div>
          <div className="terminal-controls">
            <div className="control close" />
            <div className="control minimize" />
            <div className="control maximize" />
          </div>
        </div>
        {children}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @keyframes blinkCursor {
    50% {
      border-right-color: transparent;
    }
  }

  .terminal-loader {
    border: 0.1em solid #333;
    background-color: #1a1a1a;
    color: #0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    position: relative;
  }

  .terminal-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background-color: #333;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0 0.6em;
    box-sizing: border-box;
  }

  .terminal-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }

  .control {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    margin-left: 0.4em;
    border-radius: 50%;
    background-color: #777;
  }

  .control.close {
    background-color: #e33;
  }

  .control.minimize {
    background-color: #ee0;
  }

  .control.maximize {
    background-color: #0b0;
  }

  .terminal-title {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 1.5em;
    color: #eee;
    font-size: 36px;
  }
`;

export default Loader;
