import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "antd";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1394475_0d6q9r1xk5c.js',
});

const dashItems = [
  {
    id: "workouts",
    text: "Workouts",
    link: "/workouts",
    icon: "dumbbell"
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
    icon: "LC_icon_list_line_21"
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
            <IconFont type={"icon-" + item.icon} />
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
