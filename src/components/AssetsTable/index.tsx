import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import {averageLastPrice, toCurrency} from "../../utils/formaters";
import {
    Box,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Tooltip
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

export default function AssetsTable({assets}: any): JSX.Element {
    return (
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <StyledTable aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Pair</StyledTableCell>
                            <StyledTableCell>Symbol</StyledTableCell>
                            <StyledTableCell>Market Cap</StyledTableCell>
                            <StyledTableCell>Average Last Price</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <StyledTableBody>
                        {
                            assets.map((row: any) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        <Link to={`/currencies/${row.assetSymbol}/markets`} component={RouterLink}>
                                            <strong>{row.assetName}</strong>
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>{`${row.assetSymbol}/USD`}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img src={`/assets/cryptoicons/${row.assetSymbol.toLowerCase()}.svg`}
                                             alt={row.assetSymbol}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{toCurrency(row.marketCap)}</StyledTableCell>
                                    <StyledTableCell>{toCurrency(averageLastPrice(row.markets))}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </StyledTableBody>
                    {assets.length >= 25 && (
                        <StyledTableFooter>
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} padding={'none'} style={{width: '100%'}}>
                                    <Box display="flex" justifyContent="flex-end" m={1} p={1}
                                         bgcolor="background.paper">
                                        <Box p={1}>View</Box>
                                        <Box p={1}>
                                            <Link to={'/currencies/25'} component={RouterLink}>
                                                25
                                            </Link>
                                        </Box>
                                        <Box p={1}>
                                            <Link to={'/currencies/50'} component={RouterLink}>
                                                50
                                            </Link>
                                        </Box>
                                        {/* TODO: 'All' link leads to error 'Estimated graph weight exceeds API key limit'. Must check how to bypass this */}
                                        <Tooltip disableFocusListener
                                                 title="Disabled due to 'Estimated graph weight exceeds API key limit' error"
                                                 arrow>
                                            <Box p={1}>
                                                All
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        </StyledTableFooter>)}
                </StyledTable>
            </TableContainer>
        </Grid>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    body: {
        fontSize: 14,

        '&::before': {
            /* Now like a table header */
            position: 'absolute',
            top: 4,
            left: 12,
            width: '45%',
            paddingRight: '10px',
            whiteSpace: 'nowrap',
            lineHeight: '20px',
            fontWeight: 'bold',
        },

        /*
        Label the data
         */
        '&:nth-of-type(1):before': {content: '"Name"'},
        '&:nth-of-type(2):before': {content: '"Pair"'},
        '&:nth-of-type(3):before': {content: '"Symbol"'},
        '&:nth-of-type(4):before': {content: '"Market Cap"'},
        '&:nth-of-type(5):before': {content: '"Average Last Price"'},

        [theme.breakpoints.up('sm')]: {
            '&::before': {
                display: 'none',
            },
        },
    },
    root: {
        padding: '4px 12px',
        textAlign: 'left',
        border: 'none',
        display: 'block',
        borderBottom: '1px solid #eee',
        position: 'relative',
        paddingLeft: '50%',

        [theme.breakpoints.up('sm')]: {
            display: 'table-cell',
            border: `1px solid ${theme.palette.action.hover}`,
            padding: '4px 12px',
        },
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        display: 'block',
        border: `1px solid ${theme.palette.action.hover}`,
        [theme.breakpoints.up('sm')]: {
            display: 'table-row',
            border: 'none',
        },

        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    head: {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            top: '0px',
            left: '0px',
        },
    },
    footer: {
        display: 'block',
        marginBottom: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'table-row',
        },
    }
}))(TableRow);

const StyledTable = withStyles((theme) => ({
    root: {
        display: 'block',
        border: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'table',
            border: 'none',
        },
    },
}))(Table);

const StyledTableBody = withStyles((theme) => ({
    root: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'table-row-group',
        },
    },
}))(TableBody);

const StyledTableFooter = withStyles((theme) => ({
    root: {
        display: 'block',
        border: `1px solid ${theme.palette.action.hover}`,
        [theme.breakpoints.up('sm')]: {
            display: 'table-footer-group',
        },
    },
}))(TableFooter);
