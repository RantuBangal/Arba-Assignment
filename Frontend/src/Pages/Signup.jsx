import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Box, InputGroup, Stack, Input, Button, Text } from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [cpass, seCpass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Perform basic validation
      if (!formData.fullName || !formData.userName || !formData.email || !formData.password ) {
        throw new Error("All fields are required");
      }
      if (formData.password !== cpass) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: ""
      });
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Box bg="white">
        <Box
          m={"auto"}
          boxShadow={"md"}
          width={{ base: "96%", sm: "50%", md: "72%", lg: "68%", xl: "53%" }}
          h={"90vh"}
          mt={10}
          display={"flex"}
        >
          <Sidebar />
          <Box
            gap={5}
            padding={{ base: 4, sm: 6, md: 6, lg: 8, xl: 10 }}
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            justifyItems={"center"}
            w={{ base: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" }}
            color="black"
          >
            <div
              style={{
                width: "70px",
                height: " 70px",
                backgroundColor: "rgb(1, 150, 170)",
                borderRadius: "100%",
              }}
            ></div>
            <Stack spacing={4} textAlign="center">
              <Text fontSize={30} fontWeight={700}>
                APP NAME
              </Text>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <form onSubmit={handleSubmit}>
                <Input
                  _hover="none"
                  border="1px solid skyblue"
                  borderBottom={"3px solid skyblue"}
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  required
                />{" "}
                <br />
                <Input
                  _hover="none"
                  border="1px solid skyblue"
                  borderBottom={"3px solid skyblue"}
                  placeholder="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  mt={2}
                  required
                />{" "}
                <br />
                <Input
                  _hover="none"
                  border="1px solid skyblue"
                  borderBottom={"3px solid skyblue"}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  mt={2}
                  type="email"
                  required
                />{" "}
                <br />
                <InputGroup>
                  <Input
                    _hover="none"
                    border="1px solid skyblue"
                    borderBottom={"3px solid skyblue"}
                    mt={2}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    color="black"
                    _placeholder={{ color: "gray.500" }}
                    required
                  />{" "}
                </InputGroup>
                <Input
                  mt={2}
                  _hover="none"
                  border="1px solid skyblue"
                  borderBottom={"3px solid skyblue"}
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={cpass}
                  onChange={(e)=>seCpass(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.500" }}
                  required
                />{" "}
                <Button
                  mt={3}
                  _hover="none"
                  width={"full"}
                  bgColor="rgb(1, 150, 170)"
                  type="submit"
                  disabled={loading}
                  color="white"
                >
                  {loading ? "Signing up..." : "Register"}
                </Button>
                {error && (
                  <p style={{ color: "red", marginTop: "0.25rem" }}>{error}</p>
                )}
              </form>

              <h5>
                Already have an account?{" "}
                <Link to={"/login"} style={{ color: "rgb(1, 150, 170)" }}>
                  Login
                </Link>
              </h5>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
