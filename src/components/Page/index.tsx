import React from 'react';
import {LinearProgress} from '@material-ui/core';
import NoData from "../NoData";

type PageProps = {
    loading: boolean;
    noData: boolean;
    children?: any
};

export default function Page({loading, noData, children}: PageProps): JSX.Element {
    return (
        <>
            {loading ? (
                <LinearProgress style={{width: '100%'}}/>
            ) : noData ? (
                <NoData/>
            ) : (
                <>
                    {children}
                </>
            )}
        </>
    )
};
