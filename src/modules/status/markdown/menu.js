import React from "react";
// import styled from '@emotion/core'
import styled from "@emotion/styled";

export const Button = styled("span")`
  cursor: pointer;
  text-align: center;
  padding: 2px;
  background-color: ${props =>
    props.reversed
      ? props.active
        ? "white"
        : "white"
      : props.active
        ? "#eee"
        : "white"};
`;

export const Menu = styled("div")`
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 10px 10px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;
