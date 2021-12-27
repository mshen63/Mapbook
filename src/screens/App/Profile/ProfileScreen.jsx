import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { logout } from "../../../actions/User";
import urls from "../../../../utils/urls";
import classes from "./ProfileScreen.module.css";
import { InputGroup, InputLeftElement, Input, chakra, Grid, GridItem, Stack, Flex, Button } from "@chakra-ui/react";
import { FaSearch, FaLock, FaUserClock, FaUserCheck } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai"
// const CFaUserAlt = chakra(FaUserAlt);
const SearchIcon = chakra(FaSearch);
const AddIcon = chakra(AiOutlineUserAdd)
const SentIcon = chakra(FaUserClock)
const FriendIcon = chakra(FaUserCheck)

const ProfileScreen = ({ currUser, initialFriends, initialFriendReqs, allUsers }) => {
  console.log(currUser)
  const [friends, setFriends] = useState(initialFriends)
  const [friendReqs, setFriendReqs] = useState(initialFriendReqs)
  const [users, setUsers] = useState(allUsers)
  const [search, setSearch] = useState("")
  const [sent, setSent] = useState(true)
  const [isFriend, setSent2] = useState(true)

  const sendRandomFriendReq = async () => {

  }
  return (
    <Flex
      className={classes.root}
      align="center"

    >
      {/* <h1 className={classes.centerText}>
        {currUser.username}
      </h1> */}
      <InputGroup marginBottom={6} marginTop={4}>
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
        templateColumns='repeat(3, 2fr)'
        gap={5}
      >
        {allUsers
          .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
          .map(user => {
            return (
              <GridItem
                bg='green.100'
                p={5}
                rounded="md"
              >
                {/* friends.includes(user) */}
                <Flex align="center" justifyContent="space-between">
                  <p>{user.username}</p>
                  { isFriend
                    ? (<Button rounded="xs" size="xs" isDisabled="true">
                      Friend<FriendIcon marginLeft={1}></FriendIcon>
                    </Button>)
                    :
                    (!sent
                      ? (<Button rounded="xs" size="xs">
                        Add<AddIcon marginLeft={1}></AddIcon>
                      </Button>)
                      : (<Button rounded="xs" size="xs" isDisabled="true">
                        Sent<SentIcon marginLeft={1}></SentIcon>
                      </Button>))
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
