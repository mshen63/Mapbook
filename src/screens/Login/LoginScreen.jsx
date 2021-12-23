import Router from "next/router";
import { login, signUp } from "../../actions/User";
import urls from "../../../utils/urls";
import classes from "./LoginScreen.module.css";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormErrorMessage
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(!showPassword)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    return login(username, password)
      .then(() => Router.replace(urls.pages.app.map))
      .catch((error) =>
        toast(error.message)
      );
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
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
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
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* <p className={classes.switchText}>
          Don't have an account?
          <a className={classes.buttonText} onClick={() => Router.replace(urls.pages.register)}>
            Register now
          </a>
        </p> */}
      <Box>
        Don't have an account?{" "}
        <Link color="teal.500" href={urls.pages.register}>
          Register here!
        </Link>
      </Box>
    </Flex>

  );

};

export default LoginScreen;









