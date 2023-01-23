const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "INR", style: "currency" })

export function formateCurrency(currency: number){
    return CURRENCY_FORMATTER.format(currency);
}
