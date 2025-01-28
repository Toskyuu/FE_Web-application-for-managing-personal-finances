import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCreditCard,
    faChartPie,
    faMoneyBillTransfer,
    faList,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import FloatingActionButton
    from "@/components/Elements/Buttons/FloatingButton/FloatingActionButton/FloatingActionButton.tsx";
import {useModal} from "@/hooks/useModal.tsx";
import {
    AccountForm,
    BudgetForm,
    TransactionForm,
    RecurringTransactionForm,
    CategoryForm
} from "@/components";

const FloatingButtons: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {openModal} = useModal();

    const handleOpenModal = (content: React.ReactNode) => {
        openModal(content);
        setIsExpanded(false);
    };


    return (
        <div className="fixed bottom-6 right-6 z-30">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-16 h-16 bg-primary text-text-dark rounded-full shadow-lg flex items-center justify-center transition-transform transform ${
                    isExpanded ? 'rotate-45' : 'rotate-0'
                } focus:outline-none`}
            >
                <FontAwesomeIcon icon={faPlus} size="xl"/>
            </button>

            <div
                className={`absolute bottom-20 right-0 flex flex-col items-center space-y-4 transition-all duration-300 ease-out z-50`}
            >
                <div
                    className={`transition-all transform duration-300 ${
                        isExpanded
                            ? 'opacity-100 translate-y-0 z-50 pointer-events-auto'
                            : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                    }`}
                >
                    <FloatingActionButton
                        icon={faCreditCard}
                        label="Dodaj konto"
                        onClick={() => handleOpenModal(<AccountForm/>)}
                        color="text-text-dark"
                        bgColor="bg-primary"
                    />
                </div>
                <div
                    className={`transition-all transform duration-300 delay-50 ${
                        isExpanded
                            ? 'opacity-100 translate-y-0 z-50 pointer-events-auto'
                            : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                    }`}
                >
                    <FloatingActionButton
                        icon={faChartPie}
                        label="Dodaj budżet"
                        onClick={() => handleOpenModal(<BudgetForm/>)}
                        color="text-text-dark"
                        bgColor="bg-primary"
                    />
                </div>
                <div
                    className={`transition-all transform duration-300 delay-100 ${
                        isExpanded
                            ? 'opacity-100 translate-y-0 z-50 pointer-events-auto'
                            : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                    }`}
                >
                    <FloatingActionButton
                        icon={faMoneyBillTransfer}
                        label="Dodaj transakcje"
                        onClick={() => handleOpenModal(<TransactionForm/>)}
                        color="text-text-dark"
                        bgColor="bg-primary"
                    />
                </div>
                <div
                    className={`transition-all transform duration-300 delay-150 ${
                        isExpanded
                            ? 'opacity-100 translate-y-0 z-50 pointer-events-auto'
                            : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                    }`}
                >
                    <FloatingActionButton
                        icon={faClock}
                        label="Dodaj cykliczną transakcję"
                        onClick={() => handleOpenModal(<RecurringTransactionForm/>)}
                        color="text-text-dark"
                        bgColor="bg-primary"
                    />
                </div>
                <div
                    className={`transition-all transform duration-300 delay-200 ${
                        isExpanded
                            ? 'opacity-100 translate-y-0 z-50 pointer-events-auto'
                            : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                    }`}
                >
                    <FloatingActionButton
                        icon={faList}
                        label="Dodaj kategorię"
                        onClick={() => handleOpenModal(<CategoryForm/>)}
                        color="text-text-dark"
                        bgColor="bg-primary"
                    />
                </div>
            </div>

            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsExpanded(false)}
                ></div>
            )}
        </div>


    );
};

export default FloatingButtons;
