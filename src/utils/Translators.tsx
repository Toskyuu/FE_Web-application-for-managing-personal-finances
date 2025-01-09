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
    Outcome: "Wychodząca",
    Income: "Przychodząca",
    Internal: "Wewnętrzny",
};

export const translateTransactionType = (type: string): string => {
    return TransactionTypeTranslations[type] || type;
};