import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "antd";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1394475_d8rn2jh47xo.js"
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
    icon: "icon_calendar"
  },
  {
    id: "exercises",
    text: "Exercises",
    link: "/exercises",
    icon: "icon_workmore"
  },
  {
    id: "settings",
    text: "Settings",
    link: "/settings",
    icon: "icon_setting"
  }
];

const logoutHandler = () => {
  localStorage.removeItem("beFitToken");
  localStorage.removeItem("userId");
  this.props.history.replace("/login");
};

const DashboardNavItem = props => (
  <>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[props.location.pathname.substring(1)]}
    >
      {dashItems.map(item => (
        <Menu.Item style={{ fontSize: "16px" }} key={item.id}>
          <NavLink to={item.link}>
            <IconFont type={"icon-" + item.icon} />
            <span className="nav-text">{item.text}</span>
          </NavLink>
        </Menu.Item>
      ))}
      <div>
        <Button
          style={{
            paddingLeft: "12px",
            margin: "0 12px",
            paddingRight: "12px",
            textAlign: "left",
            width: "calc(100% - 24px)"
          }}
          onClick={logoutHandler}
          type="danger"
          icon="logout"
        >
          Logout
        </Button>
      </div>
    </Menu>
  </>
);

export default DashboardNavItem;
