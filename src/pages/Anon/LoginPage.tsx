import React, {useEffect} from 'react';
import {LoginForm} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const LoginPage: React.FC = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Helmet>
                <title>Logowanie | YourFinance</title>
                <meta name="description" content="Zaloguj się w witrynie YourFinance."/>
                <link rel="canonical" href="http://localhost:4173/login"/>
            </Helmet>
            <LoginForm/>
        </>
    );
};
export default LoginPage;