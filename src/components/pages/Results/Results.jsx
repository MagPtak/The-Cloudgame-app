import { Helmet, HelmetProvider } from "react-helmet-async";
import { useUserData } from "../../../contexts/UserDataContext";
import "./Results.css";

export const Results = () => {
  const { score, nickName } = useUserData();
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>The Cloudgame - Results</title>
        </Helmet>
      </HelmetProvider>
      <div className="resultsContainer">
        <h2>Congratulations, {nickName} !</h2>
        <h2>Your score:</h2>
        <h3>
          {score} {score !== 1 ? "points" : "point"}
        </h3>
      </div>
    </div>
  );
};
