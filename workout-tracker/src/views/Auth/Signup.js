import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Form, Icon, Input, Button } from "antd";
import styled from "styled-components";

import { doSignUp } from "../../store/actions/authenticationActions";

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

class NormalSignUpForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.doSignUp(values, this.props.history);
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
    const { loadingUser, signUpError } = this.props;
    const emailError = isFieldTouched("email") && getFieldError("email");
    const usernameError = isFieldTouched("username") && getFieldError("username");
    const fullnameError = isFieldTouched("fullname") && getFieldError("fullname");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <StyledContainer>
        <StyledForm onSubmit={this.handleSubmit}>
          {typeof signUpError === "string"  && (
            <Alert
              style={{ marginBottom: "1rem" }}
              message="Failed Signup"
              description={signUpError}
              type="error"
            />
          )}
          <Form.Item
            validateStatus={fullnameError ? "error" : ""}
            help={fullnameError || ""}
          >
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  type: "string",
                  pattern: /^[a-z\-_\s]+$/i,
                  message: "Only alphanumeric with spaces are allowed for full name"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="contacts" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Full Name"
              />
            )}
             {
               typeof signUpError === "object" && signUpError.fullname &&
                <Alert message={signUpError.fullname} type="error" />
              }
          </Form.Item>
          <Form.Item
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
          >
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  type: "string",
                  message: "Please add an alphanumeric username with at least 2 characters long.!"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
             {
               typeof signUpError === "object" && signUpError.username &&
                <Alert message={signUpError.username} type="error" />
              }
          </Form.Item>
          
          <Form.Item
            validateStatus={emailError ? "error" : ""}
            help={emailError || ""}
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
             {
               typeof signUpError === "object" && signUpError.email &&
                <Alert message={signUpError.email} type="error" />
              }
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
             {
               typeof signUpError === "object" && signUpError.password &&
                <Alert message={signUpError.password} type="error" />
              }
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <StyledButton
              disabled={hasErrors(getFieldsError())}
              loading={loadingUser}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {loadingUser ? "Signing up" : "Sign up"}
            </StyledButton>
            Already have an account? <Link to="/login">Login</Link>
          </Form.Item>
        </StyledForm>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  loadingUser: state.authentication.loadingUser,
  signUpError: state.authentication.signUpError
});

const SignUp = Form.create({ name: "normal_SignUp" })(NormalSignUpForm);

export default connect(
  mapStateToProps,
  { doSignUp }
)(SignUp);
