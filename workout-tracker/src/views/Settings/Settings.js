import React from "react";
import { connect } from "react-redux";
import {
  fetchSettings,
  updateSettings
} from "../../store/actions/settingActions";
// import styled from "styled-components";
import "./settings.css";

// const div = styled.div`
//   input {
//     text-align: center;
//   }

//   .row {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .form {
//     border-radius: 5px;
//     background-color: #6bbdfa;
//     padding: 20px;
//   }

//   .row-start {
//     display: flex;
//   }

//   button {
//     border-color: transparent;
//     width: 7rem;
//     height: 1.8rem;
//     font-size: 0.7rem;
//     line-height: 1.6rem;
//     border-radius: 4px;
//     border: 1px solid #f0f4f6;
//     color: #212432;
//     cursor: pointer;
//     letter-spacing: 0.5px;
//     text-align: center;
//     background: linear-gradient(46deg, #2eb7ce, #4296cb);
//   }
// `;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wantUpdate: false,
      email: this.props.settings ? this.props.settings[0].email : null,
      username: this.props.settings ? this.props.settings[0].username : null,
      password: this.props.settings ? this.props.settings[0].password : null,
      weight: this.props.settings ? this.props.settings[0].weight : null,
      height: this.props.settings ? this.props.settings[0].height : null,
      gender: this.props.settings ? this.props.settings[0].gender : null,
      user_level: this.props.settings ? this.props.settings[0].user_level : null,
      email_notification: this.props.settings ? this.props.settings[0].email_notification : null,
      push_notification: this.props.settings ? this.props.settings[0].push_notification : null
    };
  }

  componentDidMount = () => {
    this.props.fetchSettings();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  startUpdate = () => {
    this.setState({
      wantUpdate: true,
    });
  };

  changeSettings = () => {
    const updatedSettings = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      user_level: this.state.user_level,
      email_notification: this.state.email_notification,
      push_notification: this.state.push_notification
    };

    this.props.updateSettings(updatedSettings);

    this.setState({
      wantUpdate: false,
    });
  };

  render() {
    if (this.state.wantUpdate) {
     return <div>
        {this.props.settings
          ? this.props.settings.map((setting, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <p>Email: </p>
                    <input
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder={setting.email}
                      name="email"
                    />
                  </div>
                  <div className="row">
                    <p>Username: </p>
                    <input
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder={setting.username}
                      name="username"
                    />
                  </div>
                  <div className="row">
                    <p>Password: </p>
                    <input
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder={setting.password}
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="row">
                    <p>Weight: </p>
                    <input
                      value={this.state.weight}
                      onChange={this.handleChange}
                      placeholder={setting.weight}
                      name="weight"
                    />
                  </div>
                  <div className="row">
                    <p>Height: </p>
                    <input
                      value={this.state.height}
                      onChange={this.handleChange}
                      placeholder={setting.height}
                      name="height"
                    />
                  </div>
                  <div className="row">
                    <p>Gender: </p>
                    <input
                      value={this.state.gender}
                      onChange={this.handleChange}
                      placeholder={setting.gender}
                      name="gender"
                    />
                  </div>
                  <div className="row">
                    <p>user_level</p>
                    <input
                      value={this.state.user_level}
                      onChange={this.handleChange}
                      placeholder={setting.user_level}
                      name="user_level"
                    />
                  </div>
                  <div className="row">
                    <p>Email Notification: </p>
                    <input
                      value={this.state.email_notification}
                      onChange={this.handleChange}
                      placeholder={setting.email_notification.toString()}
                      name="email_notification"
                    />
                  </div>
                  <div className="row">
                    <p>Push Notification: </p>
                    <input
                      value={this.state.push_notification}
                      onChange={this.handleChange}
                      placeholder={setting.push_notification.toString()}
                      name="push_notification"
                    />
                  </div>
                </div>
              );
            })
          : null}
        <button
        className="update-button"
         onClick={this.changeSettings}>Change</button>
      </div>;
    }
    return this.props.settings
      ? this.props.settings.map((setting, index) => {
          return (
            <div
             key={index}>
        <div
            className="user-data"        
        >
          <ul className="info">
            <li>
              <span className="text">Email:</span>
              <span className="data">
                    <p>{setting.email ? setting.email : "Not specified"}</p>
              </span>
              <span className="icon">
              <i className="fa fa-envelope"></i>
              </span>
            </li>
            <li>
              <span className="text">Username:</span>
              <span className="data">
              <p>{setting.username ? setting.username : "Not specified"}</p>
              </span>
              <span className="icon">
              <i className="fa fa-user"></i>
              </span>
            </li>
            <li>
              <span className="text">Weight:</span>
              <span className="data">
              <p>{setting.weight === 0 ? "Not specified" : setting.weight}</p>
              </span>
              <span className="icon">
              <i className="fa fa-balance-scale"></i>
              </span>
            </li>
            <li>
              <span className="text">Height:</span>
              <span className="data">
              <p>{setting.height === 0 ? "Not specified" : setting.height}</p>
              </span>
              <span className="icon">
              <i className="fa fa-arrow-circle-up"></i>
              </span>
            </li>
            <li>
              <span className="text">Gender:</span>
              <span className="data">
              <p>{setting.gender ? setting.gender : "Not specified"}</p>
              </span>
              <span className="icon">
              <i className="fa fa-venus-mars"></i>
              </span>
            </li>
            <li>
              <span className="text">Level:</span>
              <span className="data">
              <p>{setting.user_level ? setting.user_level : "Not specified"}</p>
              </span>
              <span className="icon">
              <i className="fa fa-graduation-cap"></i>
              </span>
            </li>
            <li>
              <span className="text">Email Notification:</span>
              <span className="data">
              <p>{setting.email_notification.toString()}</p>
              </span>
              <span className="icon">
              <i className="fa fa-envelope"></i>
              </span>
            </li>            
            <li>
              <span className="text">Push Notification:</span>
              <span className="data">
              <p>{setting.push_notification.toString()}</p>
              </span>
              <span className="icon">
              <i className="fa fa-bell"></i>
              </span>
            </li>
          </ul>
        </div>
        <button
        className="update-button"
        onClick={this.startUpdate}>Update</button>
            </div>
          );
        })
      : null;
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings.settings
  };
};

export default connect(
  mapStateToProps,
  { fetchSettings, updateSettings }
)(Settings);


// <div className="">
// <div className="row-start">
//   <p>Email:</p>
//   <p>{setting.email ? setting.email : "Not specified"}</p>
// </div>
// <div className="row-start">
//   <p>Username:</p>
//   <p>{setting.username ? setting.username : "Not specified"}</p>
// </div>
// <div className="row-start">
//   <p>Weight:</p>
//   <p>{setting.weight === 0 ? "Not specified" : setting.weight}</p>
// </div>
// <div className="row-start">
//   <p>Height:</p>
//   <p>{setting.height === 0 ? "Not specified" : setting.weight}</p>
// </div>
// <div className="row-start">
//   <p>Gender:</p>
//   <p>{setting.gender ? setting.gender : "Not specified"}</p>
// </div>
// <div className="row-start">
//   <p>Level:</p>
//   <p>{setting.user_level ? setting.user_level : "Not specified"}</p>
// </div>
// </div>
// <div className="row-start">
//   <p>Email Notification:</p>
//   <p>{setting.email_notification.toString()}</p>
// </div>
// <div className="row-start">
//   <p>Push Notification:</p>
//   <p>{setting.push_notification.toString()}</p>
// </div>