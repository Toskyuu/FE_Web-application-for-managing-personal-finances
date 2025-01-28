import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChartPie,
    faClock,
    faCreditCard,
    faLandmark,
    faList,
    faMoneyBillTransfer,
    faTable,
    faUser,
    faCaretDown,
    faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import YourFinance from "@/assets/YourFinance.png";
import {DefaultButton} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {logOut} = useAuth();
    const [isStatsOpen, setIsStatsOpen] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <>
            <header className="sticky top-0 z-30 bg-primary shadow-md">
                <div className="container mx-auto flex items-center justify-center p-4">
                    <button
                        className="absolute left-0 ml-4 text-text-dark h-10 w-10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Open navigation"
                    >
                        <FontAwesomeIcon icon={faBars} size="lg"/>
                    </button>

                    <div className="flex items-center h-10">
                        <img src={YourFinance} alt="Logo" className="h-full w-auto object-contain"/>
                    </div>
                </div>
            </header>

            <div
                className={`fixed top-0 left-0 h-[100vh] w-64 bg-secondary shadow-lg z-20 transform ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="mt-16 text-lg flex flex-col justify-between h-full">
                    <div className="overflow-y-auto h-[calc(75vh)] scrollbar-custom px-4">
                        <ul className="flex flex-col items-start space-y-4 pt-4">
                            <li>
                                <a
                                    href="/"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faLandmark} className="mr-2"/>
                                    Przegląd
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/transactions"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="mr-2"/>
                                    Transakcje
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/recurring-transactions"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faClock} className="mr-2"/>
                                    Cykliczne Transakcje
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/accounts"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faCreditCard} className="mr-2"/>
                                    Konta
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/budgets"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faChartPie} className="mr-2"/>
                                    Budżety
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/categories"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faList} className="mr-2"/>
                                    Kategorie
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={() => setIsStatsOpen(!isStatsOpen)}
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTable} className="mr-2"/>
                                    Statystyki
                                    <FontAwesomeIcon
                                        icon={isStatsOpen ? faCaretUp : faCaretDown}
                                        className="ml-2"
                                    />
                                </button>
                                {isStatsOpen && (
                                    <ul className="pl-8 space-y-2 mt-2">
                                        <li>
                                            <a
                                                href="/summary-by-time"
                                                className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                            >
                                                Transakcje według czasu
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/summary-by-category"
                                                className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                            >
                                                Transakcje według kategorii
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/summary"
                                                className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                            >
                                                Ogólne podsumowanie
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/cumulative"
                                                className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                            >
                                                Transakcje skumulowane
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <a
                                    href="/user"
                                    className="flex items-center px-4 py-2 text-text-dark hover:bg-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2"/>
                                    Użytkownik
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="fixed bottom-0 w-full h-auto p-4 flex items-center justify-between bg-secondary">
                        <DefaultButton
                            fontSize="text-2xl"
                            color="text-text-dark"
                            bgColor="bg-error"
                            onClick={() => logOut()}
                            text={"Wyloguj się"}
                            padding="p-4"
                            radius="rounded-2xl"
                            minwidth="min-w-30"
                        />
                        <button
                            onClick={toggleTheme}
                            className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg className="fill-text-dark block dark:hidden" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg className="fill-text-dark hidden dark:block" viewBox="0 0 20 20">
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                </nav>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-49"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Header;
