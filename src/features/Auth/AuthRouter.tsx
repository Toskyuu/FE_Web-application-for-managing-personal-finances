import {Routes, Route, Navigate} from "react-router-dom";
import AnonLayout from "@/components/Layout/AnonLayout/AnonLayout";
import LoginPage from "@/pages/Anon/LoginPage";
import LandingPage from "@/pages/Anon/LandingPage.tsx";
import RegisterPage from "@/pages/Anon/RegisterPage.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AnonLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="" element={<LandingPage/> } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};
