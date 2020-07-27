import React from 'react';
import {useQuery} from '@apollo/client';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardHeader, Grid, Link, Tooltip, Typography} from '@material-ui/core';

import Page from "../../components/Page";
import {assetBySymbol, marketsBySymbol} from "../../gql/queries/marketsBySymbol";
import {Asset, AssetPartial, AssetsMarketsVars} from "../../utils/interfaces/assets";
import {toCurrency} from "../../utils/formaters";

export default function Markets({match}: any): JSX.Element {
    const classes = useStyles();
    const assetSymbol = match.params.assetSymbol || '';
    const {loading, data} = useQuery<Asset, AssetsMarketsVars>(marketsBySymbol, {
        variables: {
            assetSymbol
        },
    });

    const {loading: loadingAsset, data: dataAsset} = useQuery<AssetPartial, AssetsMarketsVars>(assetBySymbol, {
        variables: {
            assetSymbol
        },
    });

    const marketsToRender = (data && data.markets) || [];

    const LinkCard = ({market, children}: any) => (market.ticker ?
            (<Link underline='none' component={RouterLink} to={`${match.url}/details/${market.marketSymbol}`}>
                <Card variant="outlined" className={classes.root}>
                    <CardActionArea>
                        {children}
                    </CardActionArea>
                </Card>
            </Link>)
            :
            (
                <Tooltip disableFocusListener title="There is no ticker's data, so details are not accessible" arrow>
                    <Card variant="outlined" className={classes.root}>
                        {children}
                    </Card>
                </Tooltip>
            )
    );

    return (
        <Page loading={loading || loadingAsset} noData={!marketsToRender}>
            <>
                <div className={classes.paddingTop}></div>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <img src={`/assets/cryptoicons/${assetSymbol.toLowerCase()}.svg`} alt={assetSymbol}/>
                            </Grid>
                            <Grid item>
                                <h3>{dataAsset && dataAsset.asset?.assetName}</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                    {marketsToRender.map((market, index) => (
                        <Grid item xs={12} sm={4} md={3} key={index}>
                            <LinkCard market={market}>
                                <CardHeader
                                    avatar={
                                        <img src={`/assets/cryptoicons/${assetSymbol.toLowerCase()}.svg`}
                                             alt={assetSymbol}/>
                                    }
                                />
                                <CardContent className={classes.content}>
                                    <div>{market.marketSymbol}</div>
                                    <Typography variant="subtitle1" noWrap color={'primary'} align={'center'}>
                                        <div className={market.ticker ? '' : 'no-ticker'}>
                                            {market.ticker ? toCurrency(market.ticker.lastPrice) : 'N/A'}
                                        </div>
                                    </Typography>
                                </CardContent>
                                <div></div>
                            </LinkCard>
                        </Grid>
                        )
                    )}
                </Grid>
            </>
        </Page>
    )
};

const useStyles = makeStyles({
    root: {
        minWidth: 175
    },
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    paddingTop: {
        height: '20px',
        width: '100%'
    },
    content: {
        '& > div': {
            textAlign: 'center',
            lineHeight: '16px',

            '&:first-of-type': {
                fontSize: '15px',
                fontWeight: 'bold',
                marginBottom: '6px'
            },

            '&:last-of-type': {
                marginBottom: '6px'
            }
        }
    }
});
