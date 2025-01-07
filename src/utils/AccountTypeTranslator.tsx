const AccountTypeTranslations: { [key: string]: string } = {
    Savings: "Oszczędnościowe",
    Checking: "Rozliczeniowe",
    Wallet: "Portfel",
    Piggy: "Skarbonka",
};

export const translateAccountType = (type: string): string => {
    return AccountTypeTranslations[type] || type;
};