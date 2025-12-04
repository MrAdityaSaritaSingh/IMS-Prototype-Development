import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, Link as LinkIcon, Phone, FileText } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useToast } from '../Toast';
import { Drive } from '../../types';

interface RegistrationFormProps {
  drive: Drive;
  onBack: () => void;
  onSuccess: () => void;
}

export function RegistrationForm({ drive, onBack, onSuccess }: RegistrationFormProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      showToast('Please upload your resume', 'error');
      return;
    }

    if (!declaration) {
      showToast('Please accept the declaration', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      showToast('Registration Successful!', 'success');
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white rounded-lg transition-colors border border-[#E5E7EB]"
        >
          <ArrowLeft size={20} className="text-[#6B7280]" />
        </button>
        <div>
          <h2 className="text-[#111827]">Registration Form</h2>
          <p className="text-[#6B7280] text-sm">{drive.companyName} - {drive.role}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h3 className="text-[#111827] mb-4">Resume Upload *</h3>
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="resume" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                {resumeFile ? (
                  <>
                    <FileText size={40} className="text-[#16A34A]" />
                    <div>
                      <p className="font-medium text-[#111827]">{resumeFile.name}</p>
                      <p className="text-sm text-[#6B7280]">{(resumeFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <Button type="button" variant="secondary" size="sm">
                      Change File
                    </Button>
                  </>
                ) : (
                  <>
                    <Upload size={40} className="text-[#6B7280]" />
                    <div>
                      <p className="font-medium text-[#111827] mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-[#6B7280]">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h3 className="text-[#111827] mb-4">Additional Information</h3>
          <div className="space-y-4">
            <Input
              label="LinkedIn Profile URL"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              helperText="Optional"
            />
            <Input
              label="Portfolio/GitHub URL"
              type="url"
              placeholder="https://github.com/yourusername"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              helperText="Optional"
            />
            <Input
              label="Contact Phone Number *"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Declaration */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h3 className="text-[#111827] mb-4">Declaration *</h3>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={declaration}
              onChange={(e) => setDeclaration(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#2563EB] rounded"
              required
            />
            <span className="text-sm text-[#6B7280]">
              I hereby declare that all the information provided by me is true and correct to the best of my knowledge. 
              I understand that any false information may lead to disqualification from the placement process.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-[#E5E7EB] p-6">
          <Button type="button" variant="secondary" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Submit Registration
          </Button>
        </div>
      </form>
    </div>
  );
}
