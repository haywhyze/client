import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "antd";

const dashItems = [
  {
    id: "workouts",
    text: "Workouts",
    link: "/workouts",
    icon: <i className="fas fa-dumbbell"></i>
  },
  {
    id: "dashboard",
    text: "Dashboard",
    link: "/dashboard",
    icon: <i className="fas fa-chart-line"></i>
  },
  {
    id: "exercise",
    text: "Exercises",
    link: "/exercises",
    icon: <i className="fas fa-list"></i>
  },
  {
    id: "settings",
    text: "Settings",
    link: "/settings",
    icon: <i className="fas fa-cog"></i>
  }
];

const logoutHandler = () => {
  localStorage.removeItem("beFitToken");
  localStorage.removeItem("userId");
  this.props.history.replace("/login");
};

const DashboardNavItem = props => (
  <>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['workouts']}>
      {dashItems.map(item => (
        <Menu.Item key={item.id}>
          <NavLink to={item.link}>
            <Icon type="user" />
            <span className="nav-text">{item.text}</span>
          </NavLink>
        </Menu.Item>
      ))}
      <div>
        <Button
          style={{ marginLeft: "24px" }}
          onClick={logoutHandler}
          type="danger"
        >
          Logout
        </Button>
      </div>
    </Menu>
  </>
);

export default DashboardNavItem;
