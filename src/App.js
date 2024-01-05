import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const theme = createTheme({});

const App = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [coordinates, bounds]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: "100vh" }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <List
              places={places}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
