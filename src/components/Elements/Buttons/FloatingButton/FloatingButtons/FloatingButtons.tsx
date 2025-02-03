import React, { useState, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCreditCard,
    faChartPie,
    faMoneyBillTransfer,
    faList,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import FloatingActionButton from "@/components/Elements/Buttons/FloatingButton/FloatingActionButton/FloatingActionButton.tsx";
import { useModal } from "@/hooks/useModal.tsx";
import Loader from "@/components/Elements/Loader/Loader.tsx";

const AccountForm = React.lazy(() => import("@/components/Elements/Forms/AccountForm.tsx"));
const BudgetForm = React.lazy(() => import("@/components/Elements/Forms/BudgetForm.tsx"));
const TransactionForm = React.lazy(() => import("@/components/Elements/Forms/TransactionForm.tsx"));
const RecurringTransactionForm = React.lazy(() => import("@/components/Elements/Forms/RecurringTransactionForm.tsx"));
const CategoryForm = React.lazy(() => import("@/components/Elements/Forms/CategoryForm.tsx"));

const FloatingButtons: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { openModal } = useModal();

    const handleOpenModal = (content: React.ReactNode) => {
        openModal(content);
        setIsExpanded(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-30">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Otwórz menu dodawania zasobów"
                className={`w-16 h-16 bg-primary text-text-dark rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
                    isExpanded ? 'rotate-45' : 'rotate-0'
                } hover:bg-primary-dark focus:outline-none`}
            >
                <FontAwesomeIcon icon={faPlus} size="xl"/>
            </button>

            <div
                className={`absolute bottom-20 right-0 flex flex-col items-center space-y-4 transition-all duration-300 ${
                    isExpanded
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-12 pointer-events-none'
                } z-50`}
                style={{ transformOrigin: 'bottom center' }}
            >
                <FloatingActionButton
                    icon={faCreditCard}
                    ariaLabel="Dodaj konto"
                    label="Dodaj konto"
                    onClick={() => handleOpenModal(<Suspense fallback={<div><Loader/></div>}><AccountForm /></Suspense>)}
                    color="text-text-dark"
                    bgColor="bg-primary"
                />

                <FloatingActionButton
                    icon={faChartPie}
                    ariaLabel="Dodaj budżet"
                    label="Dodaj budżet"
                    onClick={() => handleOpenModal(<Suspense fallback={<div><Loader/></div>}><BudgetForm /></Suspense>)}
                    color="text-text-dark"
                    bgColor="bg-primary"
                />

                <FloatingActionButton
                    icon={faMoneyBillTransfer}
                    ariaLabel="Dodaj transakcje"
                    label="Dodaj transakcje"
                    onClick={() => handleOpenModal(<Suspense fallback={<div><Loader/></div>}><TransactionForm /></Suspense>)}
                    color="text-text-dark"
                    bgColor="bg-primary"
                />

                <FloatingActionButton
                    icon={faClock}
                    ariaLabel="Dodaj cykliczną transakcję"
                    label="Dodaj cykliczną transakcję"
                    onClick={() => handleOpenModal(<Suspense fallback={<div><Loader/></div>}><RecurringTransactionForm /></Suspense>)}
                    color="text-text-dark"
                    bgColor="bg-primary"
                />

                <FloatingActionButton
                    icon={faList}
                    ariaLabel="Dodaj kategorię"
                    label="Dodaj kategorię"
                    onClick={() => handleOpenModal(<Suspense fallback={<div><Loader/></div>}><CategoryForm /></Suspense>)}
                    color="text-text-dark"
                    bgColor="bg-primary"
                />
            </div>

            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </div>
    );
};

export default FloatingButtons;
