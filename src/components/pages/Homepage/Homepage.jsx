import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../routerPaths";
import { useUserData } from "../../../contexts/UserDataContext";
import "./Homepage.css";

const Word = ({ chosenWords, goodWords, validate, word, ...props }) => {
  const isSelected = chosenWords.includes(word);
  const isValid = isSelected && goodWords.includes(word);
  const isInvalid = isSelected && !goodWords.includes(word);
  return (
    <li
      {...props}
      className={` ${isSelected && !validate ? "selectedWord" : ""} ${
        isValid && validate ? "validWord" : ""
      } ${isInvalid && validate ? "invalidWord" : ""} wordWrapper`}
    >
      <div>
        {validate && isValid && <p className="goodAnswerLabel">Good</p>}
        {validate && isInvalid && <p className="badAnswerLabel">Bad</p>}
        <p>{word}</p>
      </div>
    </li>
  );
};

export const Homepage = () => {
  const [data, setData] = useState("");
  const [chosenWordsArr, setChosenWordsArr] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();
  const { changeScore } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomNumber = Math.trunc(Math.random() * 3 + 1);
        const URL = `http://localhost:3000/categories/${randomNumber}`;
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const allWordsArr = data.all_words;
  const question = data.question;
  const goodWordsArr = data.good_words;

  const handleClick = (e) => {
    const textcontent = e.target.textContent;

    if (!chosenWordsArr.includes(textcontent)) {
      setChosenWordsArr([...chosenWordsArr, textcontent]);
    } else {
      const arr = chosenWordsArr.filter((el) => el !== textcontent);
      setChosenWordsArr(arr);
    }
  };

  const calculateScore = () => {
    let counter = 0;

    chosenWordsArr.forEach((el) => {
      if (goodWordsArr.includes(el)) {
        counter = counter + 2;
      } else {
        counter = counter - 1;
      }
    });

    goodWordsArr.forEach((el) => {
      if (!chosenWordsArr.includes(el)) {
        counter = counter - 1;
      }
    });

    setIsSubmited(true);
    changeScore(counter);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSubmited ? navigate(routerPaths.results) : calculateScore();
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>The Cloudgame - Homepage</title>
        </Helmet>
      </HelmetProvider>
      <div className="cloudContainer">
        <p>{question}</p>
        <form onSubmit={handleSubmit}>
          <ul>
            {allWordsArr?.map((el) => {
              return (
                <Word
                  chosenWords={chosenWordsArr}
                  goodWords={goodWordsArr}
                  word={el}
                  validate={isSubmited}
                  onClick={handleClick}
                  key={el}
                >
                  {el}
                </Word>
              );
            })}
          </ul>
          <button type="submit">
            {isSubmited ? "Finish game" : "Check answers"}
          </button>
        </form>
      </div>
    </div>
  );
};
