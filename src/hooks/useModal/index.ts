// ** React
import { useContext } from "react";

// ** Context
import { ModalContext } from "@/context/modal/modalContext";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
