import {Routes, Route, Navigate} from "react-router-dom";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import DashboardPage from "@/pages/User/DashboardPage.tsx";
import TransactionPage from "@/pages/User/TransactionsPage.tsx";
import AccountsPage from "@/pages/User/AccountsPage.tsx";

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route path="" element={<DashboardPage/> } />
                <Route path="/Transactions" element={<TransactionPage/>} />
                <Route path="/Accounts" element={<AccountsPage/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};
