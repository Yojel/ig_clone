import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import { Input } from "../../components/Input";
import { registerAction } from "../../redux/auth";
import { GithubButton } from "../../components/GithubButton";
import { OrDivider } from "../../components/OrDivider";

type IFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must have atleast 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(registerAction(data));
  };

  return (
    <div className={styles.register__container}>
      <div className={styles.register__box}>
        <h1 className={styles.register__logo}>IG_Clone</h1>
        <span className={styles.register__description}>
          Sign up to see photos and videos from your friends.
        </span>
        <GithubButton />
        <OrDivider />
        <form
          className={styles.register__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name"
            name="name"
            error={errors.name?.message}
            ref={register}
          />
          <Input
            label="Email"
            name="email"
            error={errors.email?.message}
            ref={register}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            error={errors.password?.message}
            ref={register}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            ref={register}
          />
          <button
            className={styles.register__form_button}
            disabled={!formState.isValid}
          >
            Next
          </button>
        </form>
        <div className={styles.register__login}>
          <span className={styles.register__login_text}>Have an account?</span>
          <Link to="/login" className={styles.register__login_link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
