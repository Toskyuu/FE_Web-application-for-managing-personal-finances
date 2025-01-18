import {Routes, Route, Navigate} from "react-router-dom";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import DashboardPage from "@/pages/User/DashboardPage.tsx";
import TransactionPage from "@/pages/User/TransactionsPage.tsx";
import AccountsPage from "@/pages/User/AccountsPage.tsx";
import RecurringTransactionsPage from "@/pages/User/RecurringTransactionPage.tsx";
import BudgetsPage from "@/pages/User/BudgetsPage.tsx";
import CategoriesPage from "@/pages/User/CategoriesPage.tsx";
import UserPage from "@/pages/User/UserPage.tsx";

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route path="" element={<DashboardPage/>}/>
                <Route path="/Transactions" element={<TransactionPage/>}/>
                <Route path="/Accounts" element={<AccountsPage/>}/>
                <Route path="/recurring-transactions" element={<RecurringTransactionsPage/>}/>
                <Route path="/budgets" element={<BudgetsPage/>}/>
                <Route path="/categories" element={<CategoriesPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    );
};
