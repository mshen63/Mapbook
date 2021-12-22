import { useState } from "react";
import Router from "next/router";
import { login, signUp } from "../../actions/User";
import urls from "../../../utils/urls";
import classes from "./RegisterScreen.module.css";
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
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaMailBulk } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaMailBulk = chakra(FaMailBulk);
const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    return signUp(email, username, password)
      .then(() => Router.replace(urls.pages.app.home))
      .catch((error) => window.alert(error.message));

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
        <Heading color="teal.400">Create an Account</Heading>
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
                    children={<CFaMailBulk color="gray.300" />}
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    required
 
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
                    required
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <InputRightElement width="4.5rem">
                    {/* <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>

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
        Already have an account?{" "}
        <Link color="teal.500" href={urls.pages.login}>
          Log in here!
        </Link>
      </Box>
    </Flex>

  );
};

export default RegisterScreen;


