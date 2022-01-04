import { Box, Button, chakra, Flex, Grid, GridItem, Image, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaSearch, FaUserCheck, FaUserClock } from "react-icons/fa";
import urls from "../../utils/urls";
import { acceptFriendRequest, sendFriendRequest } from "../actions/User";

const SearchIcon = chakra(FaSearch);
const AddIcon = chakra(AiOutlineUserAdd)
const SentIcon = chakra(FaUserClock)
const FriendIcon = chakra(FaUserCheck)

const FriendsSection = (props) => {
  const { currUser, initialFriends, friendReqs, allUsers } = props
  const [friends, setFriends] = useState(initialFriends)
  const [friendRequests, setFriendRequests] = useState(friendReqs)
  const [sentReqs, setSentReqs] = useState([])
  const [search, setSearch] = useState("")

  const sendFriendReq = async (friend) => {
    await sendFriendRequest(currUser, friend._id)
      .then((e) => setSentReqs([...sentReqs, friend._id]))
      .catch(e => toast.error(e.message))
  }

  const acceptFriendReq = async (friend) => {
    await acceptFriendRequest(currUser, friend._id)
      .then((e) => {
        setFriends([...friends, friend])
        setFriendRequests(friendRequests.filter(elem => elem._id != friend._id))
      })
      .catch(e => toast.error(e.message))
  }

  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
    >
      {friendRequests && friendRequests.length!=0 
        && (
          <><Text textAlign="left">Friend Requests</Text>
            <Grid
              w="80vw"
              templateColumns='repeat(5, 2fr)'
              gap={5}
              margin={3}
            >
              {friendRequests.map(user => {
                return (
                  <GridItem
                    bg='green.400'
                    p={5}
                    rounded="md"
                    key={user._id}
                    _hover={{ bg: "green.300" }}
                  >
                    <Flex align="center" justifyContent="space-between">
                      <Flex align="center" direction="row" >
                        <Image margin={1} src={user.profileImg} boxSize="20px" borderRadius="full"></Image>
                        <Link href={urls.pages.app.profile.get(user._id)}>{user.username}</Link>
                      </Flex>
                      <Button rounded="xs" size="xs" onClick={(e) => acceptFriendReq(user)}>
                        Accept<FriendIcon marginLeft={1}></FriendIcon>
                      </Button>
                    </Flex>
                  </GridItem>
                )
              })}
            </Grid></>
        )
      }


      <p>Friends</p>
      <Grid
        w="80vw"
        templateColumns='repeat(5, 2fr)'
        gap={5}
        margin={3}
      >
        {friends && friends.map(user => {
          return (
            <GridItem
              bg='green.300'
              p={5}
              rounded="md"
              key={user._id}
              _hover={{ bg: "green.200" }}
            >
              <Flex align="center" justifyContent="space-between">
                <Flex align="center" direction="row" >
                  <Image margin={1} src={user.profileImg} boxSize="20px" borderRadius="full"></Image>
                  <Link href={urls.pages.app.profile.get(user._id)}>{user.username}</Link>
                </Flex>
                <Button rounded="xs" size="xs" isDisabled>
                  Friends<FriendIcon marginLeft={1}></FriendIcon>
                </Button>
              </Flex>
            </GridItem>
          )
        })}
      </Grid>


      <Box
        border="10px"
        borderTop="3px"
        borderBottom="10px"
        borderColor="red.800"
      >
        Suggested Friends
      </Box>
      <InputGroup
        margin={3}
        width="80vw"
      >
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder={`Search Users`}
        />
      </InputGroup>
      <Grid
        w="80vw"
        templateColumns='repeat(5, 2fr)'
        gap={5}
        margin={3}
      >
        {allUsers && allUsers
          .filter(user => user.username != currUser.username)
          .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
          .filter(user => !friendReqs.find(elem => elem._id === user._id))
          .filter(user => !friends.find(elem => elem._id === user._id))
          .map(user => {
            return (
              <GridItem
                bg='green.200'
                p={5}
                rounded="md"
                key={user._id}
                _hover={{ bg: "green.100" }}
              >
                <Flex align="center" justifyContent="space-between">
                  <Flex align="center" direction="row" >
                    <Image margin={1} src={user.profileImg} boxSize="20px" borderRadius="full"></Image>
                    <Link href={urls.pages.app.profile.get(user._id)}>{user.username}</Link>
                  </Flex>
                  {
                    user.pendingFRequests.find(elem => elem._id === currUser._id) || sentReqs.includes(user._id)
                      ? (<Button rounded="xs" size="xs" isDisabled>
                        Sent<SentIcon marginLeft={1}></SentIcon>
                      </Button>)
                      : (<Button rounded="xs" size="xs" onClick={(e) => sendFriendReq(user)}>
                        Add<AddIcon marginLeft={1}></AddIcon>
                      </Button>)
                  }
                </Flex>
              </GridItem>
            )
          })}
      </Grid>
    </Flex >
  )
};

export default FriendsSection;
