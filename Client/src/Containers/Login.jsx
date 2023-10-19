import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import LoginInputes from "../Components/LoginInput";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_passward, setconfirm_passward] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(
    () => {
      if (user) {
        navigate("/", { replace: true });
      }
    },
    [user]
  );

  const logInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged(cred => {
        if (cred) {
          cred.getIdToken().then(token => {
            validateUserJWTToken(token).then(data => {
              console.log(data);
              dispatch(setUserDetails(data));
            });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_passward === "") {
      // alert message
    } else {
      if (password === confirm_passward) {
        setuserEmail("");
        setpassword("");
        setconfirm_passward("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then(userCred => {
          firebaseAuth.onAuthStateChanged(cred => {
            if (cred) {
              cred.getIdToken().then(token => {
                validateUserJWTToken(token).then(data => {
                  console.log(data);
                  dispatch(setUserDetails(data));
                });
              });
              navigate("/", { replace: true });
            }
          });
        });
      } else {
        // alert message
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(
        firebaseAuth,
        userEmail,
        password
      ).then(useCred => {
        firebaseAuth.onAuthStateChanged(cred => {
          if (cred) {
            cred.getIdToken().then(token => {
              validateUserJWTToken(token).then(data => {
                console.log(data);
                dispatch(setUserDetails(data));
              });
              navigate("/", { replace: true });
            });
          }
        });
      });
    } else {
      // alert message
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBg}
        alt=""
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 py-12 absolute right-0">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        <p className="text-3xl font-semibold text-headingColor underline mt-6">
          Wellcome Back
        </p>
        <p className="text-xl text-textColor mt-2">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInputes
            placeHolder={"Enter_Your_Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type="email"
            isSignup={isSignUp}
          />
          <LoginInputes
            placeHolder={"New_Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignup={isSignUp}
          />
          {isSignUp &&
            <LoginInputes
              placeHolder={"Confirm_Passward"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_passward}
              inputStateFunc={setconfirm_passward}
              type="password"
              isSignup={isSignUp}
            />}

          {!isSignUp
            ? <p>
                Don't have an account:{" "}
                <motion.button
                  {...buttonClick}
                  className="text-red-500 underline cursor-pointer bg-transparent"
                  onClick={() => setisSignUp(true)}
                >
                  Click Here
                </motion.button>{" "}
              </p>
            : <p>
                Already have an account:{" "}
                <motion.button
                  {...buttonClick}
                  className="text-red-500 underline cursor-pointer bg-transparent"
                  onClick={() => setisSignUp(false)}
                >
                  Click Here
                </motion.button>{" "}
              </p>}

          {/* button section */}
          {isSignUp
            ? <motion.button
                {...buttonClick}
                className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
                onClick={signUpWithEmailPass}
              >
                Sign Up
              </motion.button>
            : <motion.button
                {...buttonClick}
                onClick={signInWithEmailPass}
                className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              >
                Sign in
              </motion.button>}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white" />
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white" />
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={logInWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
