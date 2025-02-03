import RegisterForm from "@/components/Elements/Forms/RegisterForm.tsx";
import React, {useEffect} from 'react';
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const RegisterPage: React.FC = () => {
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
                <title>Rejestracja | YourFinance</title>
                <meta name="description" content="Zarejestruj się w witrynie YourFinance"/>
                <link rel="canonical" href="http://localhost:4173/register"/>
            </Helmet>
            <RegisterForm/>
        </>
    );
};
export default RegisterPage;