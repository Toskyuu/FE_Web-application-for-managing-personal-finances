import React from 'react';
import {useNavigate} from 'react-router-dom';
import {DefaultButton} from "@/components";

const Error500Page: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full bg-surface-light dark:bg-surface-dark">
                <h1 className="text-5xl font-bold text-error">500</h1>
                <h2 className="text-2xl  mt-4">Internal Server Error</h2>
                <p className="text-lg  mt-2">
                    Coś poszło nie tak. Sprawdź swoje połączenie z internetem.
                    W razie dalszych problemów skontaktuj się z nami.
                </p>
                <DefaultButton
                    text="Powróć do strony głównej"
                    onClick={() => navigate("/")}
                    bgColor="bg-secondary"
                    color="text-text-dark"
                    padding="p-4 mt-5"
                    radius="rounded-xl"
                    fontSize="text-l"
                    minwidth=""
                />
            </div>
        </div>
    );
};

export default Error500Page;
