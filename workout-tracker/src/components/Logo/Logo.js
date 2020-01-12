import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../../assets/images/beFit-logo.png";

const logo = () => (
  <StyledLogo to="/">
    <img style={{ width: "3rem" }} alt="befit logo" src={logoImg} />
  </StyledLogo>
);

export default logo;

const StyledLogo = styled(NavLink)`
    padding: 0 .3rem;
    &:hover {
        transform: scale(1.1);
        transition: .2s all;
        background: rgba(222,222,222,0.01);
    }
`