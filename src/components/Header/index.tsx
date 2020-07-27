import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, FormControlLabel, Link, Switch, Toolbar, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Search from "../Search";

type HeaderProps = {
    value: string;
    handleInputFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleModeFn: () => void;
};

export default function Header({value: searchValue, handleInputFn, handleModeFn}: HeaderProps): JSX.Element {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.wrapper}>
                <div className={classes.row}>
                    <FormControlLabel
                        control={<Switch onClick={() => handleModeFn()}/>}
                        label="Dark Mode"
                    />
                    <nav className={classes.nav}>
                        <Link className={classes.link} color='secondary' component={RouterLink} to={"/"}>Home</Link>
                    </nav>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Cryptocurrency Market
                    </Typography>
                    <Search searchValue={searchValue} onChange={(e) => handleInputFn(e)} />
                </div>
            </Toolbar>
        </AppBar>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        row: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        nav: {
            display: 'flex',
            flexDirection: 'row'
        },
        link: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        wrapper: {
            display: 'flex',
            flexFlow: 'row wrap',
            fontWeight: 'bold',
            textAlign: 'center',

            '& > *': {
                padding: '10px',
                flex: '1 100%'
            }
        }
    }),
);
