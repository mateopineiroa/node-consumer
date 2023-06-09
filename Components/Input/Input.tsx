import { ForwardedRef, LegacyRef, forwardRef } from "react";

type InputType = {
  label?: string;
  fieldName: string;
  Type?: string;
  formData: {
    [key: string]: string | number | readonly string[] | undefined;
  };
  setFormData: Function;
  placeholder?: string;
  className?: string;
  id?: string | undefined;
};

export const InputMode = {
  Text: "text",
  Number: "number",
  Password: "password",
  Email: "email",
  Tel: "tel",
};

/**
 * @param formData Recieves the object with the field data
 * @param setFormData Exposes the object with the updated field data
 * @param fieldName String of the fieldName of the object of the input
 * @param label Label of component
 * @param id The id is the fieldName for default. You can add a custom one
 */
const Input = forwardRef(
  (
    {
      label = "",
      fieldName,
      Type = InputMode.Text,
      formData,
      setFormData,
      placeholder,
      className = "",
      id = undefined,
    }: InputType,
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => (
    <div
      ref={ref}
      className={`flex flex-col gap-2 text-gray-700 w-[300px] ${className}`}
    >
      <label
        className="select-none text-sm text-gray-400 cursor-pointer w-fit"
        htmlFor={id ?? fieldName}
      >
        {label}
      </label>

      <input
        className="w-full rounded-lg px-4 py-1"
        value={formData[fieldName]}
        name={fieldName}
        id={id ?? fieldName}
        placeholder={placeholder}
        type={Type}
        onChange={({ target }) =>
          setFormData({ ...formData, [target.name]: target.value })
        }
      />
    </div>
  )
);

export default Input;

// const LabelInput = forwardRef(
//   (
//     {
//       label = '',
//       fieldName,
//       Type = InputType.Text,
//       formData,
//       setFormData,
//       placeholder,
//       className = '',
//       id = undefined,
//     },
//     ref
//   ) => (
//     <div ref={ref} className={twMerge(`flex flex-col gap-2 ${className}`)}>
//       <label className="select-none text-sm text-grey-800 cursor-pointer w-fit" htmlFor={id ?? fieldName}>
//         {label}
//       </label>

//       <Input
//         className="w-full"
//         value={formData[fieldName]}
//         name={fieldName}
//         id={id ?? fieldName}
//         placeholder={placeholder}
//         type={Type}
//         onChange={({ target }) => setFormData({ ...formData, [target.name]: target.value })}
//       />
//     </div>
//   )
// );

// LabelInput.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   label: PropTypes.string,
//   fieldName: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/require-default-props
//   Type: PropTypes.string,
//   formData: PropTypes.shape({}).isRequired,
//   setFormData: PropTypes.func.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/require-default-props
//   className: PropTypes.string,
//   // eslint-disable-next-line react/require-default-props
//   id: PropTypes.string,
// };
// export default LabelInput;
