
import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ServerApi from "../service/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // API request
      const dataResponse = await fetch(
        ServerApi.Login.url,
        {
          method: ServerApi.Login.method || "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      // Parse response
      const response = await dataResponse.json();

      // Check response status
      if (!dataResponse.ok || !response.success) {
        throw new Error(
          response.message || "Invalid email or password"
        );
      }

      // Save JWT token
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Save user details
      if (response.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      }

      // Success notification
      toast.success("Login successful!");

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.message || "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-4"
    >
      <Row className="w-100 justify-content-center">

        <Col xs={11} sm={8} md={6} lg={4}>

          <Card className="shadow border-0 rounded-4">

            <Card.Body className="p-4 p-md-5">

              <h2 className="text-center fw-bold mb-2">
                Welcome Back
              </h2>

              <p className="text-center text-muted mb-4">
                Please login to your account
              </p>

              <Form onSubmit={handleSubmit}>

                {/* Email */}
                <Form.Group className="mb-3">

                  <Form.Label>Email Address</Form.Label>

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">

                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

                {/* Forgot Password */}
                <div className="text-end mb-3">

                  <Link
                    to="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 py-2 fw-semibold"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <Spinner
                        size="sm"
                        animation="border"
                        className="me-2"
                      />

                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}

                </Button>

              </Form>

              {/* Signup Link */}
              <p className="text-center mt-4 mb-0">

                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="text-decoration-none fw-semibold"
                >
                  Sign Up
                </Link>

              </p>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default Login;
