import React from 'react';
import Select, { Props as ReactSelectProps,GroupBase,} from 'react-select';

interface CustomSelectProps<OptionType, IsMulti extends boolean = false>
  extends ReactSelectProps<OptionType, IsMulti, GroupBase<OptionType>> {
  label?: string;
  name?: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelclassName?:string
}

const CustomSelect = <
  OptionType,
  IsMulti extends boolean = false
>({
  label,
  name,
  error,
  labelclassName,
  required = false,
  className = '',
  ...rest
}: CustomSelectProps<OptionType, IsMulti>) => {
  return (
    <div className={`custom-select-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className={labelclassName}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}

      <Select<OptionType, IsMulti>
        inputId={name}
        classNamePrefix="custom-select"
        {...rest}
      /> 
      {error && (
        <div className="custom-select-error" style={{ color: 'red', fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
