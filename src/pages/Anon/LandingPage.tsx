import React from 'react';
import {AnonLayout, DefaultButton} from "@/components";
// import {Link} from "react-router-dom";


const LandingPage: React.FC = () => {
    return (
        <AnonLayout>
            <main className="flex-1 p-6 flex-col gap-10 flex items-center justify-center">
                {/*<Link to="/auth/login">*/}
                    <DefaultButton
                        fontSize="text-4xl"
                        color="text-text-dark"
                        bgColor="bg-success"
                        onClick={() => console.log("Zaloguj się clicked")}
                        text={"Zaloguj się"}
                        padding="p-6"
                        radius="rounded-3xl"
                        minwidth="min-w-40"
                    />
                {/*</Link>*/}
                {/*<Link to="/auth/register">*/}
                    <DefaultButton
                        fontSize="text-4xl"
                        color="text-text-dark"
                        bgColor="bg-success"
                        onClick={() => console.log("Zarejestruj się clicked")}
                        text={"Zarejestruj się"}
                        padding="p-6"
                        radius="rounded-3xl"
                        minwidth="min-w-40"
                    />
                {/*</Link>*/}
            </main>
        </AnonLayout>
    );
};

export default LandingPage;
