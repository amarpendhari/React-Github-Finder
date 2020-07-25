import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users
  const searchUsers = async text => {
    setLoading();
    console.log(text);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    console.log("Git data", res.data);
    //this.setState({ users: res.data.items, loading: false });
    //setUsers(res.data.items);
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  //Get user
  const getUser = async username => {
    setLoading();
    //console.log(text);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    console.log("User", res.data);
    //this.setState({ user: res.data, loading: false });
    //setUser(res.data);
    //setLoading(false);
    dispatch({ type: GET_USER, payload: res.data });
  };

  //Get Repos
  const getUserRepos = async username => {
    //this.setState({ loading: true });
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    console.log("Repos", res.data);
    //this.setState({ repos: res.data, loading: false });
    //setRepos(res.data);
    //setLoading(false);
    //console.log(repos);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
