import {
  Avatar, Box, Button, chakra, Flex, FormControl, Heading,
  Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FaLock, FaMailBulk, FaUserAlt } from "react-icons/fa";
import urls from "../../utils/urls";
import { signUp } from "../actions/User";


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
      .then(() => Router.replace(urls.pages.app.map))
      .catch((error) => {
        if (!error.message.includes("E1100")) {
          toast.error(error.message)
          return;
        }
        let error_mess = (error.message.split(": ")[2].split(",")[0]).split("_")[0]
        if (error_mess === "username") {
          toast.error('Username taken!');
        } else if (error_mess === "email") {
          toast.error("Email taken!")
        }
      });

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
        <Heading color="green.700">Create an Account</Heading>
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
                color="white"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="green.600" href={urls.pages.login}>
          Log in here!
        </Link>
      </Box>
    </Flex>
  );
};

export default RegisterScreen;


