import { Routes, Route } from "react-router-dom";
import AnonLayout from "@/components/Layout/AnonLayout/AnonLayout";
import LoginPage from "@/pages/Anon/LoginPage";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AnonLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};
