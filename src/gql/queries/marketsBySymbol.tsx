import gql from "graphql-tag";

export const marketsBySymbol = gql`
    query MarketsBySymbol($assetSymbol: String) {
        markets(filter: {
            baseSymbol: { 
                _eq: $assetSymbol 
            } 
        }) {
            marketSymbol
            baseSymbol
            exchangeSymbol
            ticker {
                lastPrice
                highPrice
                lowPrice
                percentChange
            }
         }
       }
`;

export const assetBySymbol = gql`
    query asset($assetSymbol: String!) {
        asset(assetSymbol: $assetSymbol) {
            assetName
        }
    }
`;
