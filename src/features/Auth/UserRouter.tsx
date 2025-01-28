import {Routes, Route, Navigate} from "react-router-dom";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import DashboardPage from "@/pages/User/DashboardPage.tsx";
import TransactionPage from "@/pages/User/TransactionsPage.tsx";
import AccountsPage from "@/pages/User/AccountsPage.tsx";
import RecurringTransactionsPage from "@/pages/User/RecurringTransactionPage.tsx";
import BudgetsPage from "@/pages/User/BudgetsPage.tsx";
import CategoriesPage from "@/pages/User/CategoriesPage.tsx";
import UserPage from "@/pages/User/UserPage.tsx";
import ConfirmEmail from "@/pages/ConfirmEmail.tsx";
import ResetPasswordPage from "@/pages/ResetPasswordPage.tsx";
import CumulativePage from "@/pages/User/CumulativePage.tsx";
import SummaryByTimePage from "@/pages/User/SummaryByTimePage.tsx";
import SummaryByCategoryPage from "@/pages/User/SummaryByCategoryPage.tsx";
import SummaryPage from "@/pages/User/SummaryPage.tsx";

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
                <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/summary-by-time" element={<SummaryByTimePage/>}/>
                <Route path="/summary-by-category" element={<SummaryByCategoryPage/>}/>
                <Route path="/summary" element={<SummaryPage/>}/>
                <Route path="/cumulative" element={<CumulativePage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    );
};
