import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import { Input } from "../../components/Input";
import { login } from "../../redux/auth";
import { OrDivider } from "../../components/OrDivider";
import { GithubButton } from "../../components/GithubButton";

type IFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must have atleast 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(login(data));
  };

  return (
    <div className={styles.login__container}>
      <div className={styles.login__box}>
        <h1 className={styles.login__logo}>IG_Clone</h1>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            label="E-Mail"
            error={errors.email?.message}
            ref={register}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            error={errors.password?.message}
            ref={register}
          />
          <button
            className={styles.login__form_button}
            disabled={!formState.isValid}
          >
            Log In
          </button>
        </form>
        <OrDivider />
        <GithubButton />
        <div className={styles.login__register}>
          <span className={styles.login__register_text}>
            Don't have an account?
          </span>
          <Link to="/register" className={styles.login__register_link}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
