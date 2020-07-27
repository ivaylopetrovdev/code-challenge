import {AssetMarkets} from "./interfaces/assets";

const numFormatObj = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

export const toCurrency = (number: string): string => `${numFormatObj.format(Number(number))}`;

export const toPercentage = (percentage: string): string => `${Number(percentage)}%`;

export const averageLastPrice = (markets: AssetMarkets[]): string =>
    markets
        .filter((market: any) => {
            if (market.ticker) {
                return market;
            }
            return false;
        })
        .reduce((acc: any, value: any, index: any, array: any) => {
            const calculatedValue = acc + Number(value.ticker.lastPrice);

            if (index === array.length - 1) {
                return parseFloat((calculatedValue / array.length).toString()).toFixed(2);
            }

            return calculatedValue;
        }, 0);
