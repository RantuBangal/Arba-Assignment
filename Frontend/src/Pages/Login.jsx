import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Box, InputGroup, Stack, Input, Button, Text } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      const data = await response.json();
      console.log(data)
      localStorage.setItem("name",data.UserData.name)
      localStorage.setItem("username",data.UserData.userName)
      localStorage.setItem("email",data.UserData.email)
      localStorage.setItem("avatar",data.UserData.avatar)
      localStorage.setItem("token",data.token)
      setFormData({ email: "", password: "" });
      navigate("/"); 
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
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  color="black"
                  _placeholder={{ color: "gray.500" }}
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
                  />
                  <br />
                </InputGroup>
                <Button
                  mt={3}
                  _hover="none"
                  color="white"
                  width={"full"}
                  bgColor="rgb(1, 150, 170)"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {error && (
                  <p style={{ color: "red", marginTop: "0.25rem" }}>
                    {error}
                  </p>
                )}
                
              </form>
              <p style={{color:"green"}}>Email: example@gmail.com</p>
                <p style={{color:"green"}}>Password: 123</p>
              <h5>
                Don't have an account?{" "}
                <Link to={"/register"} style={{ color: "rgb(1, 150, 170)" }}>
                  Signup
                </Link>
              </h5>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
