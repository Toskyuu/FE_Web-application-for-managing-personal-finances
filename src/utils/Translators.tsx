const AccountTypeTranslations: { [key: string]: string } = {
    Savings: "Oszczędnościowe",
    Checking: "Rozliczeniowe",
    Wallet: "Portfel",
    Piggy: "Skarbonka",
};

export const translateAccountType = (type: string): string => {
    return AccountTypeTranslations[type] || type;
};

const TransactionTypeTranslations: { [key: string]: string } = {
    Outcome: "Wydatek",
    Income: "Dochód",
    Internal: "Przelew wewnętrzny",
};

export const translateTransactionType = (type: string): string => {
    return TransactionTypeTranslations[type] || type;
};

const RecurringTypeTranslations: { [key: string]: string } = {
    Daily: "Codziennie",
    Weekly: "Co tydzień",
    Biweekly: "Co dwa tygodnie",
    Monthly: "Co miesiąc"
};

export const translateRecurringType = (type: string): string => {
    return RecurringTypeTranslations[type] || type;
};

const Months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

export const translateMonth = (monthYear: string): string => {
    const monthIndex = parseInt(monthYear.slice(5, 7), 10) - 1;

    return Months[monthIndex];
};