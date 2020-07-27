import gql from "graphql-tag";

export const pageAssets = gql`
    query PageAssets($filter: String, $limit: Int) {
        assets(sort: [{ marketCapRank: ASC }], page: { limit: $limit }, filter: { assetName: { _like: $filter } }) {
            id
            assetName
            assetSymbol
            marketCap
            markets {
                ticker {
                    lastPrice
                }
            }
         }
       }
`;
