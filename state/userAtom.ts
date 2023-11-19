import { atom } from "recoil";

const user={
    username:"Guest",
    password:1234
}

const defaultState={
    isLoggedIn:false
}

export const userState = atom({
  key: "user",
  default: defaultState,
});
