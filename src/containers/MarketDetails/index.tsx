import React from 'react';
import {useQuery} from '@apollo/client';
import {Card, CardContent, CardHeader, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import {marketTicker} from "../../gql/queries/tickerByMarket";
import {Asset, AssetTickerVars} from "../../utils/interfaces/assets";
import {toCurrency, toPercentage} from "../../utils/formaters";
import Page from "../../components/Page";

export default function MarketDetails({match}: any): JSX.Element {
    const classes = useStyles();
    const marketSymbol = match.params[0] || '';
    const assetSymbol = match.params.assetSymbol || '';
    const {loading, data} = useQuery<Asset, AssetTickerVars>(marketTicker, {
        variables: {
            marketSymbol
        },
    });

    const defaultTicker = {
        lastPrice: '0',
        highPrice: '0',
        lowPrice: '0',
        percentChange: '0'
    };

    const dataToRender = ((data && data.markets.length) && data.markets[0].ticker) || defaultTicker;

    return (
        <Page loading={loading} noData={!dataToRender}>
            <>
                <div className={classes.paddingTop}></div>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <h3>{`${marketSymbol}'s Details`}</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Card variant="outlined" className={classes.root}>
                            <CardHeader
                                avatar={
                                    <img src={`/assets/cryptoicons/${assetSymbol.toLowerCase()}.svg`}
                                         alt={assetSymbol}/>
                                }
                                title={marketSymbol.split(':')[0]}
                            />
                            <CardContent>
                                <Grid container className={classes.gridContainer}>
                                    <Grid item xs={12}>
                                        <Grid container className={classes.gridContainerInner}
                                              style={{borderBottom: '1px solid gray'}}>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" noWrap color={'primary'}>
                                                    {marketSymbol.split(':')[1]}
                                                </Typography>
                                                <span>Pair</span>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" noWrap color={'primary'}>
                                                    {toCurrency(dataToRender.lastPrice)}
                                                </Typography>
                                                <span>Price</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container className={classes.gridContainerInner}>
                                            <Grid item xs={6} sm={3}>
                                                <Typography variant="subtitle2" noWrap>
                                                    {toCurrency(dataToRender.lastPrice)}
                                                </Typography>
                                                <span>Last Price</span>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <span
                                                    style={{'color': +dataToRender.percentChange >= 0 ? '#8BC34A' : '#F44336'}}>{toPercentage(dataToRender.percentChange)}</span>
                                                <span>24 h Change</span>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <span>{toCurrency(dataToRender.lowPrice)}</span>
                                                <span>24 h Low</span>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <span>{toCurrency(dataToRender.highPrice)}</span>
                                                <span>24 h High</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <div></div>
                        </Card>
                    </Grid>
                </Grid>
            </>
        </Page>
    )
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: 175
    },
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',

        [theme.breakpoints.up('md')]: {
            paddingLeft: '48px',
        },
    },
    paddingTop: {
        height: '20px',
        width: '100%'
    },
    gridContainerInner: {
        display: 'flex',
        flexDirection: 'row',

        '& > *': {
            padding: '10px 0px !important',
            flex: '1 100%',
            fontWeight: 'bold',
            fontSize: '14px',

            '& > span': {
                display: 'flex',

                '&:last-of-type': {
                    fontSize: '13px',
                    marginTop: '3px',
                    fontWeight: 'normal'
                }
            },

            '&:last-of-type': {
                paddingBottom: '0px !important'
            }
        }
    }
}));
