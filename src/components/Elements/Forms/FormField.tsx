import React from "react";
import {UseFormRegister, FieldErrors} from "react-hook-form";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    options?: { value: string | number; label: string }[];
    register: UseFormRegister<any>;
    errors: FieldErrors;
    validation?: object;
    value?: string | number;
    onChange?: (value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 id,
                                                 label,
                                                 type = "text",
                                                 options,
                                                 register,
                                                 errors,
                                                 validation = {},
                                                 value,
                                                 onChange,
                                             }) => {
    return (
        <div>
            <label htmlFor={id} className="block">
                {label}
            </label>
            {type === "select" && options ? (
                <select
                    id={id}
                    {...register(id, validation)}
                    className="w-full p-2 border bg-background-dark rounded"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                >
                    <option value="">Wybierz opcję</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    type={type}
                    {...register(id, validation)}
                    className="w-full p-2 border bg-background-dark rounded"
                />
            )}
            {errors[id]?.message && (
                <p className="text-red-500">{String(errors[id]?.message)}</p>
            )}
        </div>
    );
};

export default FormField;
