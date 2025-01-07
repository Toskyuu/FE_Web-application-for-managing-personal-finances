import React from 'react';
import {DefaultButton} from "@/components";
import {useNavigate} from "react-router-dom";


const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className="flex-1 p-6 flex-col gap-10 flex items-center justify-center">
            <DefaultButton
                fontSize="text-4xl"
                color="text-text-dark"
                bgColor="bg-success"
                onClick={() => navigate("/login")}
                text={"Zaloguj się"}
                padding="p-6"
                radius="rounded-3xl"
                minwidth="min-w-40"
            />
            <DefaultButton
                fontSize="text-4xl"
                color="text-text-dark"
                bgColor="bg-success"
                onClick={() => navigate("/register")}
                text={"Zarejestruj się"}
                padding="p-6"
                radius="rounded-3xl"
                minwidth="min-w-40"
            />
        </main>
    );
};

export default LandingPage;
