import { useContext } from "react";
import { TransitionContext } from "../context/TransitionContext";

export const useTransition = () => useContext(TransitionContext);
