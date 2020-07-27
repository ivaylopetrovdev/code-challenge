import React, {useState} from "react";

import {Redirect, Route, Switch} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {Container, CssBaseline, Grid, PaletteType, ThemeOptions} from '@material-ui/core';

import Header from "../../components/Header";
import * as ROUTES from '../../utils/routes';
import useDebounce from "../../utils/debounce";
import "../../assets/styles/App.css";

import Home from "../Home";
import Markets from "../Markets";
import MarketDetails from "../MarketDetails";

const themeObject = {
  palette: {
    primary: {
      main: '#009688'
    },
    secondary: {
      main: '#FFFFFF'
    },
    type: 'light' as PaletteType
  },
  overrides: {
    MuiCardHeader: {
      root: {
        padding: '10px 10px 0px',
      },
      title: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    MuiCardContent: {
      root: {
        padding: '4px 10px 10px',
      },
    },
  },
  themeName: 'Custom Mode'
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);
  const {palette: {type}} = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light' as PaletteType
      }
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode] as const;
};

export default function App(): JSX.Element {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme as ThemeOptions);

  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value);

  return (
      <ThemeProvider theme={themeConfig}>
        <CssBaseline/>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{flexGrow: 1}}>
            <Grid container direction="row">
              <Header
                  value={searchText}
                  handleInputFn={(e) => handleInput(e)}
                  handleModeFn={() => toggleDarkMode()}
              />
            </Grid>

            <Switch>
              <Route exact path='/' render={() => <Redirect to='/currencies/25'/>}/>
              <Route exact path={ROUTES.HOME}>
                <Home filter={debouncedSearchText}/>
              </Route>
              <Route exact path={ROUTES.MARKETS} component={Markets} />
              <Route exact path={ROUTES.MARKET_DETAILS} component={MarketDetails} />
            </Switch>
          </Grid>
        </Container>
      </ThemeProvider>
  );
};
