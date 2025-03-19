// ** React
import { useContext } from "react";

// ** Context
import { DataStateContext } from "../../context/dataState/dataStateContext";

export const useDataStateContext = () => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error("useDataStateContext must be used within a DataStateProvider");
  }
  return context;
};
