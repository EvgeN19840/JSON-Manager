// ** React
import { FC, useState } from "react";

// ** Types
import { HomeProps } from "./types";
import { ITypeJSON } from "./const/types";

// ** Componets
import { Header, MyGrid } from "./components";
import { Box } from "@mui/material";

export const Home: FC<HomeProps> = (props) => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  return (
    <>
      <Header {...props} />
      <Box>
        <MyGrid data={data} setData={setData} />
      </Box>
    </>
  );
};
