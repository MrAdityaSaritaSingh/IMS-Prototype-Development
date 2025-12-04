import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, helperText, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[#111827]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 border rounded-lg bg-white text-[#111827] transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]' : 'border-[#E5E7EB] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]'}
            disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
            placeholder:text-[#9CA3AF] outline-none ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-sm text-[#DC2626]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-[#6B7280]">{helperText}</span>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function TextArea({ label, helperText, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[#111827]">
          {label}
        </label>
      )}
      <textarea
        className={`px-4 py-2.5 border rounded-lg bg-white text-[#111827] transition-all duration-200 resize-none
          ${error ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]' : 'border-[#E5E7EB] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]'}
          disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
          placeholder:text-[#9CA3AF] outline-none ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-[#DC2626]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-[#6B7280]">{helperText}</span>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, helperText, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[#111827]">
          {label}
        </label>
      )}
      <select
        className={`px-4 py-2.5 border rounded-lg bg-white text-[#111827] transition-all duration-200
          ${error ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]' : 'border-[#E5E7EB] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]'}
          disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
          outline-none ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-[#DC2626]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-[#6B7280]">{helperText}</span>
      )}
    </div>
  );
}
