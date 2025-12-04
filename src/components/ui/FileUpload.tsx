import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  onChange: (file: File | null) => void;
  helperText?: string;
}

export function FileUpload({ label, accept, onChange, helperText }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileChange(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-[var(--color-text-primary)]">{label}</label>}
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[var(--color-primary)] bg-blue-50'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
        }`}
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <File className="w-8 h-8 text-[var(--color-primary)]" />
            <div className="text-left">
              <p className="text-sm">{file.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-[var(--color-text-secondary)]" />
            <p className="text-[var(--color-text-secondary)]">
              Drag & drop or <span className="text-[var(--color-primary)]">browse</span>
            </p>
          </div>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
      
      {helperText && (
        <span className="text-xs text-[var(--color-text-secondary)]">{helperText}</span>
      )}
    </div>
  );
}
