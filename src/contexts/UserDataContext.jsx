import { useContext } from "react";
import { createContext, useState } from "react";

const UserDataContext = createContext({
  nickName: "",
  score: 0,
  changeNickName: () => {},
  changeScore: () => {},
});

const UserDataProvider = ({ children }) => {
  const [nickName, setNickName] = useState("");
  const [score, setScore] = useState(0);

  const changeNickName = (name) => setNickName(name);
  const changeScore = (score) => setScore(score);

  return (
    <UserDataContext.Provider
      value={{ nickName, score, changeNickName, changeScore }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
export default UserDataProvider;
