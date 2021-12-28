import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { logout } from "../../../actions/User";
import urls from "../../../../utils/urls";
import classes from "./ProfileScreen.module.css";
import { sendFriendRequest, acceptFriendRequest } from "../../../actions/User";
import { InputGroup, InputLeftElement, Input, chakra, Grid, GridItem, Stack, Flex, Button, Text, Divider, Box } from "@chakra-ui/react";
import { FaSearch, FaLock, FaUserClock, FaUserCheck } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai"
import toast from "react-hot-toast";
// const CFaUserAlt = chakra(FaUserAlt);
const SearchIcon = chakra(FaSearch);
const AddIcon = chakra(AiOutlineUserAdd)
const SentIcon = chakra(FaUserClock)
const FriendIcon = chakra(FaUserCheck)
// { currUser, initialFriends, initialFriendReqs, initialSentReqs, allUsers }
const ProfileScreen = (props) => {
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
      className={classes.root}
      align="center"

    >
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
              bg='yellow.100'
              p={5}
              rounded="md"
              key={user._id}
            >
              <Flex align="center" justifyContent="space-between">
                <p>{user.username}</p>
                <Button rounded="xs" size="xs" isDisabled>
                  Friends<FriendIcon marginLeft={1}></FriendIcon>
                </Button>
              </Flex>
            </GridItem>
          )
        })}
      </Grid>


      <Text textAlign="left">Friend Requests</Text>
      <Grid
        w="80vw"
        templateColumns='repeat(5, 2fr)'
        gap={5}
        margin={3}
      >
        {friendRequests && friendRequests.map(user => {
          return (
            <GridItem
              bg='blue.100'
              p={5}
              rounded="md"
              key={user._id}
            >
              <Flex align="center" justifyContent="space-between">
                <p>{user.username}</p>
                <Button rounded="xs" size="xs" onClick={(e) => acceptFriendReq(user)}>
                  Accept<FriendIcon marginLeft={1}></FriendIcon>
                </Button>
              </Flex>
            </GridItem>
          )
        })}
      </Grid>

      <Box 
        border = "10px"
        borderTop = "3px"
        borderBottom = "10px"
        borderColor = "red.800"
      >Suggested Friends</Box>
      <InputGroup
        margin={3}
        width = "80vw"
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
        margin = {3}
      >
        {/* all users that are not current user, friend, sent user friend request, or have search term */}
        {allUsers && allUsers
          .filter(user => user.username != currUser.username)
          .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
          .filter(user => !friendReqs.find(elem => elem._id === user._id))
          .filter(user => !friends.find(elem => elem._id === user._id))
          .map(user => {
            return (
              <GridItem
                bg='green.100'
                p={5}
                rounded="md"
                key={user._id}
              >
                {/* friends.includes(user) */}
                <Flex align="center" justifyContent="space-between">
                  <p>{user.username}</p>
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

    </Flex>
  )
};

// ProfileScreen.propTypes = {
//   currUser: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default ProfileScreen;
