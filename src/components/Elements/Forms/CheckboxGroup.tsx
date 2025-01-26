import React from "react";
import { useController } from "react-hook-form";

interface CheckboxGroupProps {
    id: string;
    label: string;
    options: { value: string | number; label: string }[];
    control: any;
    errors: any;
    validation?: object;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
                                                         id,
                                                         label,
                                                         options,
                                                         control,
                                                         errors,
                                                         validation = {},
                                                     }) => {
    const {
        field: { value, onChange },
    } = useController({
        name: id,
        control,
        defaultValue: [], // Inicjalizujemy jako pustą tablicę
        rules: validation,
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        let updatedValue: string[];

        if (e.target.checked) {
            updatedValue = [...value, newValue]; // Dodajemy do tablicy
        } else {
            updatedValue = value.filter((item: string) => item !== newValue); // Usuwamy z tablicy
        }

        onChange(updatedValue); // Przekazujemy nową tablicę do formularza
    };

    return (
        <div>
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>
            <div className="bg-gray-200 p-4 rounded-md">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 mb-2">
                        <input
                            id={option.value.toString()}
                            type="checkbox"
                            value={option.value.toString()}
                            checked={value.includes(option.value.toString())} // Zaznaczenie na podstawie wartości w `value`
                            onChange={handleCheckboxChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor={option.value.toString()}>{option.label}</label>
                    </div>
                ))}
            </div>
            {errors[id]?.message && (
                <p className="text-red-500 mt-2">{String(errors[id]?.message)}</p>
            )}
        </div>
    );
};

export default CheckboxGroup;
