// ** React
import { FC, useState } from "react";

// ** Types
import { HomeProps } from "./types";
import { ITypeJSON } from "./const/types";

// ** Componets
import { Header,  MyGrid } from "./components";

export const Home: FC<HomeProps> = (props) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<ITypeJSON | null>(null);

  // const handleClose = (
  //   _: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   changeState(setOpen, false);
  // };

  return (
    <>
      <Header {...props} />
      <MyGrid data={data} />

    </>
  );
};
