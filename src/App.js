import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const theme = createTheme({});

const App = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getPlacesData()
      .then((data) => {
        console.log(data);
        setPlaces(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
