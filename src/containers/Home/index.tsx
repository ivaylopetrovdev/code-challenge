import React from 'react'
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

import {pageAssets} from "../../gql/queries/assets";
import {URLParams} from "../../utils/interfaces/urlParams";
import {AssetsData, AssetsVars} from "../../utils/interfaces/assets";
import AssetsTable from "../../components/AssetsTable";
import Page from "../../components/Page";

export default function Home({filter}: any): JSX.Element {
    const {limit} = useParams<Partial<URLParams>>();

    const {loading, data} = useQuery<AssetsData, AssetsVars>(pageAssets, {
        variables: {
            limit: limit === 'all' ? 2147483647 : Number(limit),
            filter: `%${filter}%`
        }
    });

    const assetsToRender = data && data.assets;

    return (
        <Page loading={loading} noData={!assetsToRender}>
            <AssetsTable assets={assetsToRender}/>
        </Page>
    )
};
