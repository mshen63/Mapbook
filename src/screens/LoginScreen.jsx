import {
  Avatar, Box, Button, chakra, Flex, FormControl, Heading,
  Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FaLock, FaUserAlt } from "react-icons/fa";
import urls from "../../utils/urls";
import { login } from "../actions/User";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(!showPassword)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      return await Router.replace(urls.pages.app.explore);
    } catch (error) {
      return toast(error.message);
    }
  };

  return (

    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Toaster
        toastOptions={{
          style: {
            textAlign: "center"
          }
        }}
      />
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        backgroundColor="whiteAlpha.900"
        p="5rem"
        rounded="2xl"
      >
        <Avatar bg="green.600" />
        <Heading color="green.700">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>

          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="green.700"
                width="full"
                color="white"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Don't have an account?{" "}
        <Link color="green.600" href={urls.pages.register}>
          Register here!
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginScreen;









