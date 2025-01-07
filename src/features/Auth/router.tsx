import { Routes, Route } from "react-router-dom";
import AnonLayout from "@/components/Layout/AnonLayout/AnonLayout";
import LoginPage from "@/pages/Anon/LoginPage";
import LandingPage from "@/pages/Anon/LandingPage.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AnonLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="" element={<LandingPage/> } />
            </Route>
        </Routes>
    );
};
