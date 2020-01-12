import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Menu } from "antd";

import Logo from "../Logo/Logo";


const navItems = [
  { id: "about", text: "About", link: "/about", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
  { id: "login", text: "Login", link: "/login", auth: false }
];

const MainNavBar = () => (
  <StyledNav>
    <Logo />
    <Menu theme="dark" mode="horizontal">
      {navItems.map(item => (
        <Menu.Item key={item.id}>
          <NavLink to={item.link}>{item.text}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  </StyledNav>
);

export default MainNavBar;

const StyledNav = styled.nav`
  margin: 0 3rem;
  display: flex;
  align-items: center;
  z-index: +10;
  justify-content: space-between;

  @media screen and (max-width: 750px) {
    margin: 0;
  }
`;
