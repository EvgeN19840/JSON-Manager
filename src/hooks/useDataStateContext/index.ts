import { DataStateContext } from "@/context/dataState/dataStateContext";
import { useContext } from "react";

export const useDataStateContext = () => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error("useDataStateContext must be used within a DataStateProvider");
  }
  return context;
};
