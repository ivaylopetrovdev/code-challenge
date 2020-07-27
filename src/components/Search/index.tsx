import React from 'react';

import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";

type SearchProps = {
    searchValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({searchValue, onChange}: SearchProps): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search cryptocurrency…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChange(e)}
                value={searchValue}
            />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: 0,
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        }
    }),
);
