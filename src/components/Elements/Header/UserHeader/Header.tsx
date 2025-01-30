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
import YourFinance from "@/assets/YourFinance.webp";
import {DefaultButton} from "@/components";
import {useAuth} from "@/hooks/useAuth.tsx";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {logOut, isAuthenticated} = useAuth();
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        if(theme != 'light' && prefersDarkMode) {
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
            <header className="sticky top-0 z-30 bg-septenary shadow-md">
                <div className="container mx-auto flex items-center justify-center p-4">
                    {isAuthenticated ? (
                        <button
                            className="absolute left-0 ml-4 text-text-dark h-10 w-10"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Open navigation"
                        >
                            <FontAwesomeIcon icon={faBars} size="lg"/>
                        </button>
                    ) : (<button onClick={toggleTheme}
                                 aria-label="Zmień motyw"
                                 className="absolute left-0 ml-4 text-text-dark h-10 w-10">
                        <svg className="fill-text-dark block dark:hidden" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg className="fill-text-dark hidden dark:block" viewBox="0 0 20 20">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </button>)}
                    <Link to="/">
                        <div className="flex items-start h-full space-x-1">
                            <img src={YourFinance} alt="Logo" height="34px" width="34px"
                                 className=" object-contain lg:h-[34px] lg:w-[34px] md:h-[30px] md:w-[30px] h-[26px] w-[26px]"/>
                            <p className="text-2xl md:text-3xl lg:text-4xl text-text-dark text-start ">YourFinance</p>
                        </div>
                    </Link>
                </div>
            </header>

            {isAuthenticated && (
                <div
                    className={`fixed top-0 left-0 h-[100vh] w-64 bg-octenary shadow-lg z-20 transform ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
                >
                    <nav className="mt-16 text-lg flex flex-col justify-between h-full ">
                        <div className="overflow-y-auto h-[calc(75vh)] scrollbar-custom ">
                            <ul className="flex flex-col items-start pt-4 w-full">
                                <li className="w-full h-full ">
                                    <a
                                        href="/"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full "
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faLandmark}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Przegląd</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/transactions"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300  w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faMoneyBillTransfer}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Transakcje</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/recurring-transactions"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300  w-full h-full"
                                    >
                                        <div className="flex items-center w-full ">
                                            <div className="flex justify-start w-12 flex-shrink-0">
                                                <FontAwesomeIcon icon={faClock}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2  text-left">Cykliczne Transakcje</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/accounts"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faCreditCard}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Konta</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/budgets"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faChartPie}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Budżety</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/categories"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faList}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Kategorie</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <button
                                        onClick={() => setIsStatsOpen(!isStatsOpen)}
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faTable}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Statystyki</p>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={isStatsOpen ? faCaretUp : faCaretDown}
                                                className="ml-2"
                                            />
                                        </div>
                                    </button>
                                    {isStatsOpen && (
                                        <ul className="pl-8 mt-2">
                                            <li>
                                                <a
                                                    href="/summary-by-time"
                                                    className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                                >
                                                    Transakcje według czasu
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/summary-by-category"
                                                    className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                                >
                                                    Transakcje według kategorii
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/summary"
                                                    className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300 w-full h-full"
                                                >
                                                    Ogólne podsumowanie
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/cumulative"
                                                    className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300  w-full h-full"
                                                >
                                                    Transakcje skumulowane
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/user"
                                        className="flex items-center p-4 text-text-dark hover:brightness-150 bg-octenary duration-300  w-full h-full"
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="flex justify-start w-12">
                                                <FontAwesomeIcon icon={faUser}/>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="ml-2 flex-grow text-left">Użytkownik</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>

                        </div>

                        <div className="fixed bottom-0 w-full h-auto p-4 flex items-center justify-between bg-octenary">
                            <DefaultButton
                                fontSize="text-2xl"
                                color="text-text-dark"
                                bgColor="bg-error"
                                onClick={() => logOut()}
                                text={"Wyloguj się"}
                                padding="p-3"
                                radius="rounded-2xl"
                                minwidth="min-w-20"
                            />
                            <button
                                onClick={toggleTheme}
                                aria-label="Zmień motyw"
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
            )}
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
