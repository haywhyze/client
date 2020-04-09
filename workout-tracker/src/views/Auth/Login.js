import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Form, Icon, Input, Button, Checkbox } from "antd";
import styled from "styled-components";

import { doLogIn } from "../../store/actions/authenticationActions";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
`;

const StyledForm = styled(Form)`
  max-width: 25rem;
  padding: 2.5rem !important;
  margin: 2.5rem !important;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  @media only screen and (max-width: 600px) {
    padding: 2.5rem 1.5rem !important;
    margin: 1.5rem !important;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NormalLoginForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.doLogIn(values, this.props.history);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldError
    } = this.props.form;
    const { loadingUser, loginError } = this.props;
    const usernameError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <StyledContainer>
        <StyledForm onSubmit={this.handleSubmit}>
          {loginError && typeof loginError === "string" && (
            <Alert
              style={{ marginBottom: '1rem' }}
              message="Failed Login"
              description={loginError}
              type="error"
            />
          )}
          <Form.Item
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
          >
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  type: "email",
                  message: "Please provide a valid email address!"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email Address"
              />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  min: 6,
                  message: "Password must be 6 characters or more"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <StyledButton
              disabled={hasErrors(getFieldsError())}
              onClick={this.startLoading}
              loading={loadingUser}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {loadingUser ? "Logging in" : "Log in"}
            </StyledButton>
            Or <Link to="/signup">Register now!</Link>
          </Form.Item>
        </StyledForm>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  loadingUser: state.authentication.loadingUser,
  loginError: state.authentication.loginError
});

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);

export default connect(
  mapStateToProps,
  { doLogIn }
)(Login);
