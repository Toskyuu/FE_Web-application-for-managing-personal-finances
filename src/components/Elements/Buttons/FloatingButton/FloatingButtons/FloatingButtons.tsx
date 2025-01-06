import React, { useState } from "react";
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

const FloatingButtons: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-16 h-16 bg-primary text-text-dark rounded-full shadow-lg flex items-center justify-center transition-transform transform ${
                    isExpanded ? "rotate-45" : "rotate-0"
                } focus:outline-none`}
            >
                <FontAwesomeIcon icon={faPlus} size="xl" />
            </button>

            <div
                className={`absolute bottom-20 right-0 space-y-4 ${isExpanded ? "flex" : "hidden"} flex-col items-center transition-all duration-500 ease-in-out z-50`}
            >
                <FloatingActionButton
                    icon={faCreditCard}
                    label="Dodaj konto"
                    onClick={() => console.log("Konto clicked")}
                    color="text-dark"
                    bgColor="primary"
                />
                <FloatingActionButton
                    icon={faChartPie}
                    label="Dodaj budżet"
                    onClick={() => console.log("Budżet clicked")}
                    color="text-dark"
                    bgColor="primary"
                />
                <FloatingActionButton
                    icon={faMoneyBillTransfer}
                    label="Dodaj transakcje"
                    onClick={() => console.log("Transakcje clicked")}
                    color="text-dark"
                    bgColor="primary"
                />
                <FloatingActionButton
                    icon={faClock}
                    label="Dodaj cykliczną transakcję"
                    onClick={() => console.log("Transakcja cykliczna clicked")}
                    color="text-dark"
                    bgColor="primary"
                />
                <FloatingActionButton
                    icon={faList}
                    label="Dodaj kategorię"
                    onClick={() => console.log("Kategoria clicked")}
                    color="text-dark"
                    bgColor="primary"
                />
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