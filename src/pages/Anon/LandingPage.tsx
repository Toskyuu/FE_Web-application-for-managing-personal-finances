import React from 'react';
import {DefaultButton, MainCard} from "@/components";
import {useNavigate} from "react-router-dom";
import YourFinance from "@/assets/YourFinance.png";


const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-10">
            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto md:w-1/2 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                    <div className="flex items-center justify-center w-full h-auto ">
                        <img
                            src={YourFinance}
                            alt="YourFinance Logo"
                            className=" w-96 object-contain py-10"
                        />
                    </div>
                    <div className="text-center text-wrap w-full py-5">
                        <h2 className="text-4xl font-semibold mt-2">Twój menadżer finansów</h2>
                        <p className="text-xl  mt-2">
                            Zarządzaj finansami osobistymi, monitoruj oraz analizuj wydatki
                        </p>
                    </div>
                </div>

                <hr className="w-full border-2 opacity-40"/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
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
                </div>
            </MainCard>
            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto md:w-1/2">
                <h2 className="text-2xl font-semibold mb-10 text-center">Dlaczego warto wybrać nas?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                        <span className=" text-4xl">💳</span>
                        <p className="text-justify"><span  className="text-secondary">Zarządzanie kontami bankowymi</span> – śledź swoje salda i transakcje.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className=" text-4xl">📊</span>
                        <p className="text-justify"><span  className="text-secondary">Statystyki i analizy</span> – wizualizuj swoje wydatki i dochody.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className=" text-4xl">🎯</span>
                        <p className="text-justify"><span  className="text-secondary">Budżetowanie</span> – ustaw limity wydatków dla wybranych kategorii.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className=" text-4xl">🌍</span>
                        <p className="text-justify"><span  className="text-secondary">Dostępność</span> – korzystaj z aplikacji na komputerze i urządzeniach
                            mobilnych.</p>
                    </div>
                </div>
            </MainCard>

            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto md:w-1/2">
                <h2 className="text-2xl font-semibold mb-10 text-center">Zalety aplikacji</h2>
                <ul className="list-disc pl-6 text-start  space-y-4">
                    <li className="pl-2 text-justify"><strong className="text-secondary">Kompletne
                        rozwiązanie:</strong> Wszystko, czego
                        potrzebujesz do zarządzania finansami w jednym miejscu.
                    </li>
                    <li className="pl-2 text-justify"><strong className="text-secondary">Szybkość i
                        prostota:</strong> Dodawaj transakcje w kilka
                        sekund.
                    </li>
                    <li className="pl-2 text-justify"><strong
                        className="text-secondary">Personalizacja:</strong> Dostosuj aplikację do swoich
                        potrzeb.
                    </li>
                </ul>
            </MainCard>

            <MainCard fontSize="text-lg" padding="p-6" height="h-auto" width="w-auto md:w-1/2">
                <h2 className="text-2xl font-semibold mb-10 text-center">Jak to działa?</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">1</span>
                        <p className="text-justify"><strong className="text-secondary">Załóż konto:</strong> Zarejestruj
                            się w kilka sekund.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">2</span>
                        <p className="text-justify"><strong className="text-secondary">Dodaj swoje dane
                            finansowe:</strong> Spisuj wydatki i
                            przychody.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">3</span>
                        <p className="text-justify"><strong className="text-secondary">Zacznij zarządzać
                            finansami:</strong> Śledź wydatki, planuj
                            budżet i osiągaj cele.
                        </p>
                    </div>
                </div>
            </MainCard>
        </div>
    );
};

export default LandingPage;
