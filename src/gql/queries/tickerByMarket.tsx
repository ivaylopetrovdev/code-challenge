import gql from "graphql-tag";

export const marketTicker = gql`
    query MarketTicker($marketSymbol: String) {
        markets(marketSymbol: $marketSymbol) {
            ticker {
                percentChange
                lastPrice
                lowPrice
                highPrice
                baseVolume
                quoteVolume
            }
        }
       }
`;
