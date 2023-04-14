import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../routerPaths";
import { useUserData } from "../../../contexts/UserDataContext";
import { StyledTextField } from "./StyledTextField";
import "./Signin.css";

export const Signin = () => {
  const navigate = useNavigate();
  const { changeNickName } = useUserData();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickName: "",
    },
  });

  const onSubmit = () => {
    changeNickName(getValues("nickName"));
    navigate(routerPaths.home);
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>The Cloudgame - Sign In</title>
        </Helmet>
      </HelmetProvider>
      <div className="signinContainer">
        <h1>Wordcloud Game</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            placeholder="Enter you nick name here..."
            error={errors.nickName}
            helperText={errors?.nickName?.message}
            {...register("nickName", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Please use at least 2 characters",
              },
              maxLength: {
                value: 15,
                message: "Maximum lenght is 15",
              },
            })}
          />
          <button type="submit">play</button>
        </form>
      </div>
    </div>
  );
};
