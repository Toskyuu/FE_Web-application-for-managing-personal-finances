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
        defaultValue: [],
        rules: validation,
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        let updatedValue: string[];

        if (e.target.checked) {
            updatedValue = [...value, newValue];
        } else {
            updatedValue = value.filter((item: string) => item !== newValue);
        }

        onChange(updatedValue);
    };

    return (
        <div>
            <label htmlFor={id} className="block mb-2">
                {label}
            </label>
            <div className=" p-4 ">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 mb-2">
                        <input
                            id={option.value.toString()}
                            type="checkbox"
                            value={option.value.toString()}
                            checked={value.includes(option.value.toString())}
                            onChange={handleCheckboxChange}
                            className="h-3 w-3 appearance-none rounded-sm bg-surface-light border-2 border-surface-light outline outline-2 outline-surface-dark dark:outline-surface-light checked:bg-secondary"
                        />

                        <label htmlFor={option.value.toString()}>{option.label}</label>
                    </div>
                ))}
            </div>
            {errors[id]?.message && (
                <p className="text-error mt-2">{String(errors[id]?.message)}</p>
            )}
        </div>
    );
};

export default CheckboxGroup;
