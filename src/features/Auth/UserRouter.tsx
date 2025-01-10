import { Routes, Route } from "react-router-dom";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import DashboardPage from "@/pages/User/DashboardPage.tsx";
import TransactionPage from "@/pages/User/TransactionPage.tsx";

export const UserRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route path="" element={<DashboardPage/> } />
                <Route path="/Transactions" element={<TransactionPage/>} />
            </Route>
        </Routes>
    );
};
