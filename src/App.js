import React from "react";
// import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./hooks/useLocalStorageState";

import GoalList from "./components/GoalList";
import NewGoalForm from "./components/NewGoalForm";
import Chart from "./components/Chart";

import { Switch, Route, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";

import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(2),
  },
  searchFilterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "95%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkBoxContainer: {
    padding: theme.spacing(2),
  },
  navItemsRight: {
    margin: "auto",
    marginRight: 0,
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
 
  window: PropTypes.func,
};

function App(props) {
  const classes = useStyles();
  const history = useHistory();
  const [darkState, setDarkState] = useLocalStorageState("darkMode", false);
  const paletteType = darkState ? "dark" : "light";

  const arcBlue = "#FBCB0A";
  const arcOrange = "#F94C66";

  const theme = createMuiTheme({
    palette: {
      common: {
        blue: `${arcBlue}`,
        orange: `${arcOrange}`,
      },
      primary: {
        main: `${arcBlue}`,
      },
      secondary: {
        main: `${arcOrange}`,
      },
      type: paletteType,
    },
    overrides: {
      MuiTableCell: {
        head: {
          fontSize: "1rem",
          fontWeight: 700,
          color: arcOrange,
          borderColor: arcOrange,
        },
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const [globalHashTags] = useLocalStorageState("hashtags", [
    { _id: "0", tag: "food", color: "grey" },
    { _id: "1", tag: "personal", color: "teal" },
    { _id: "2", tag: "family", color: "lime" },
    { _id: "3", tag: "academic", color: "blue" },
  ]);
  const [goals, setGoals] = useLocalStorageState("goals", [
    
  ]);
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6">Task Manager</Typography>
              <div className={classes.navItemsRight}>
                <Button
                  type="contained"
                  color="secondary"
                  onClick={() => {
                    history.push("/statistics");
                  }}
                >
                 <b>📊</b>  
                </Button>
                <IconButton
                  aria-label="toggle dark mode"
                  aria-controls="menu-appbar"
                  aria-haspopup="false"
                  onClick={handleThemeChange}
                  color="inherit"
                >
                  {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box my={2}>
            <Switch>
              <Route
                path="/"
                exact
                render={(routeProps) => (
                  <>
                    <NewGoalForm
                      setGoals={setGoals}
                      globalHashTags={globalHashTags}
                    />
                    <GoalList
                      goals={goals}
                      setGoals={setGoals}
                      globalHashTags={globalHashTags}
                    />
                  </>
                )}
              />
              <Route
                path="/statistics"
                exact
                render={(routeProps) => <Chart goals={goals} />}
              />
            </Switch>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
