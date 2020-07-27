export interface AssetsData {
    assets: Asset[];
}

export interface AssetPartial {
    __typename: "AssetPartial";
    asset: {
        assetName: string | null;
    }
}

export interface Asset {
    __typename: "Asset";
    id: string;
    assetName: string | null;
    assetSymbol: string | null;
    marketCap: number;
    markets: (AssetMarkets)[];
}

export interface AssetMarkets {
    __typename: "Market";
    marketSymbol: string | null;
    baseSymbol: string | null;
    exchangeSymbol: string | null;
    ticker: AssetsMarketsTicker | null;
}


interface AssetsMarketsTicker {
    __typename: "Ticker";
    lastPrice: string;
    highPrice: string;
    lowPrice: string;
    percentChange: string;
}

export interface AssetsVars {
    limit: number;
    filter?: string;
}

export interface AssetsMarketsVars {
    assetSymbol?: string;
}

export interface AssetTickerVars {
    marketSymbol?: string;
}
