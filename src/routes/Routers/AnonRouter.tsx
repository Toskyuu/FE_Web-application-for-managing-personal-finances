import {Routes, Route, Navigate} from "react-router-dom";
import AnonLayout from "@/components/Layout/AnonLayout/AnonLayout.tsx";
import LoginPage from "@/pages/Anon/LoginPage.tsx";
import LandingPage from "@/pages/Anon/LandingPage.tsx";
import RegisterPage from "@/pages/Anon/RegisterPage.tsx";
import ConfirmEmail from "@/pages/ConfirmEmail.tsx";
import ResetPasswordPage from "@/pages/ResetPasswordPage.tsx";

export const AnonRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AnonLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="confirm-email" element={<ConfirmEmail/>}/>
                <Route path="reset-password" element={<ResetPasswordPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    );
};
