import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle, Building2, IndianRupee, Users, Plus, Trash2, Sparkles, Info, BookOpen, UserCircle, FileText, ListChecks } from 'lucide-react';
import { Button } from '../Button';
import { Input, Select, TextArea } from '../Input';
import { useToast } from '../Toast';
import { Modal } from '../Modal';
import { curriculumData } from '../../data/curriculumData';

import { Drive } from '../../types';

interface CreateDriveWizardProps {
  onBack: () => void;
  onComplete: () => void;
  initialData?: Drive;
}

export function CreateDriveWizard({ onBack, onComplete, initialData }: CreateDriveWizardProps) {
  const [step, setStep] = useState(1);
  const { showToast } = useToast();

  // Form data
  // Step 1: Basic Info
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [hrName, setHrName] = useState(initialData?.hrName || '');
  const [hrEmail, setHrEmail] = useState(initialData?.hrEmail || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [mode, setMode] = useState(initialData?.mode || 'On-Campus');

  // Step 2: JD & Eligibility
  const [role, setRole] = useState(initialData?.role || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [minCGPA, setMinCGPA] = useState(initialData?.eligibilityCriteria?.minCGPA.toString() || '7.0');
  const [maxBacklogs, setMaxBacklogs] = useState(initialData?.eligibilityCriteria?.maxBacklogs.toString() || '0');
  const [branches, setBranches] = useState<string[]>(initialData?.eligibilityCriteria?.allowedBranches || ['B.Tech - CSE', 'B.Tech - IT']);
  const [years, setYears] = useState<string[]>(initialData?.eligibilityCriteria?.allowedYears || ['2024', '2025']);

  // Smart Branch Selection State
  const [isOpenForAll, setIsOpenForAll] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [selectedBranchCurriculum, setSelectedBranchCurriculum] = useState<string | null>(null);

  // Step 3: Process Flow
  const [process, setProcess] = useState<string[]>(initialData?.process || ['Online Assessment', 'Technical Interview']);

  // Step 4: Compensation
  const [ctc, setCTC] = useState(initialData?.ctc.toString() || '');
  const [stipend, setStipend] = useState(initialData?.stipend?.toString() || '');
  const [basePay, setBasePay] = useState('');
  const [variablePay, setVariablePay] = useState('');

  const totalSteps = 5; // 4 Input Steps + 1 Review

  const handleNext = () => {
    if (step === 1) {
      if (!companyName || !hrName || !hrEmail) {
        showToast('Please fill all required fields', 'error');
        return;
      }
    } else if (step === 2) {
      if (!role || !description || !deadline) {
        showToast('Please fill all required fields', 'error');
        return;
      }
    } else if (step === 4) {
      if (!ctc) {
        showToast('Please enter CTC', 'error');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    showToast('Drive submitted for Placement Cell review!', 'success');
    setTimeout(onComplete, 1000);
  };

  const branchOptions = [
    'B.Tech - CSE', 'B.Tech - EE',
    'M.Tech - CSE', 'M.Tech - CSIS', 'M.Tech - PDM',
    'Dual Degree - CLD', 'Dual Degree - CSE',
    'PhD', 'MS Research'
  ];
  const yearOptions = ['2024', '2025', '2026'];

  const handleSuggestBranches = () => {
    const suggested: string[] = [];
    const jdLower = description.toLowerCase();

    if (jdLower.includes('machine learning') || jdLower.includes('ai') || jdLower.includes('data')) {
      suggested.push('M.Tech - CSE', 'B.Tech - CSE');
    }
    if (jdLower.includes('vlsi') || jdLower.includes('circuit')) {
      suggested.push('B.Tech - EE');
    }
    if (jdLower.includes('security') || jdLower.includes('crypto')) {
      suggested.push('M.Tech - CSIS');
    }
    if (jdLower.includes('research')) {
      suggested.push('PhD', 'MS Research', 'Dual Degree - CSE');
    }

    if (suggested.length > 0) {
      setBranches([...new Set([...branches, ...suggested])]);
      showToast(`AI suggested ${suggested.length} branches based on JD`, 'success');
    } else {
      showToast('No specific branches suggested based on keywords', 'info');
    }
  };

  const handleViewCurriculum = (branch: string) => {
    setSelectedBranchCurriculum(branch);
    setShowCurriculumModal(true);
  };

  const steps = [
    { id: 1, label: 'Basic Info', icon: Building2 },
    { id: 2, label: 'JD & Eligibility', icon: FileText },
    { id: 3, label: 'Process', icon: ListChecks },
    { id: 4, label: 'Compensation', icon: IndianRupee },
    { id: 5, label: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-[#E5E7EB]"
          >
            <ArrowLeft size={20} className="text-[#6B7280]" />
          </button>
          <div>
            <h2 className="text-[#111827]">Create New Drive</h2>
            <p className="text-[#6B7280] text-sm">Step {step} of {totalSteps}: {steps[step - 1].label}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-0 top-5 transform -translate-y-1/2 w-full h-1 bg-[#E5E7EB] -z-10" />
          <div
            className="absolute left-0 top-5 transform -translate-y-1/2 h-1 bg-[#16A34A] -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />

          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center bg-white px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all mb-2 border-2
                ${step > s.id ? 'bg-[#16A34A] border-[#16A34A] text-white' :
                  step === s.id ? 'bg-[#2563EB] border-[#2563EB] text-white' :
                    'bg-white border-[#E5E7EB] text-[#6B7280]'}`}
              >
                {step > s.id ? <CheckCircle size={20} /> : <s.icon size={18} />}
              </div>
              <span className={`text-xs font-medium ${step === s.id ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-[#2563EB]">
              <Building2 size={24} />
              <h3 className="text-lg font-semibold text-[#111827]">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Company Name *"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Mode *"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  options={[
                    { value: 'On-Campus', label: 'On-Campus' },
                    { value: 'Off-Campus', label: 'Off-Campus' },
                    { value: 'Virtual', label: 'Virtual' }
                  ]}
                />
                <Input
                  label="Location"
                  placeholder="e.g., Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Input
                label="HR Name *"
                placeholder="Contact Person Name"
                value={hrName}
                onChange={(e) => setHrName(e.target.value)}
                icon={<UserCircle size={18} />}
                required
              />
              <Input
                label="HR Email *"
                type="email"
                placeholder="hr@company.com"
                value={hrEmail}
                onChange={(e) => setHrEmail(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Job Description */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <div className="flex items-center gap-2 mb-4 text-[#2563EB]">
                <FileText size={24} />
                <h3 className="text-lg font-semibold text-[#111827]">Job Description & Eligibility</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Job Role *"
                  placeholder="e.g., Software Development Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <TextArea
                  label="Role Description *"
                  rows={4}
                  placeholder="Describe the role, responsibilities, and required skills..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Input
                  label="Registration Deadline *"
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h4 className="text-sm font-semibold text-[#6B7280] mb-4 uppercase">Eligibility Criteria</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum CGPA *"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    placeholder="7.0"
                    value={minCGPA}
                    onChange={(e) => setMinCGPA(e.target.value)}
                    required
                  />
                  <Input
                    label="Maximum Backlogs Allowed *"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={maxBacklogs}
                    onChange={(e) => setMaxBacklogs(e.target.value)}
                    required
                  />
                </div>

                {/* Smart Branch Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#111827]">Allowed Branches *</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isOpenForAll}
                          onChange={(e) => {
                            setIsOpenForAll(e.target.checked);
                            if (e.target.checked) setBranches(branchOptions);
                            else setBranches([]);
                          }}
                          className="w-4 h-4 text-[#2563EB] rounded"
                        />
                        <span className="text-sm text-[#6B7280]">Open for All Streams</span>
                      </label>
                      <Button size="sm" variant="secondary" onClick={handleSuggestBranches} disabled={!description}>
                        <Sparkles size={14} className="text-[#D97706]" />
                        Suggest from JD
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                    {branchOptions.map(branch => (
                      <div key={branch} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${branches.includes(branch) ? 'bg-[#EFF6FF] border-[#2563EB]' : 'border-[#E5E7EB] hover:bg-[#F9FAFB]'}`}>
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={branches.includes(branch)}
                            onChange={(e) => {
                              if (isOpenForAll && !e.target.checked) setIsOpenForAll(false);
                              if (e.target.checked) {
                                setBranches([...branches, branch]);
                              } else {
                                setBranches(branches.filter(b => b !== branch));
                              }
                            }}
                            className="w-4 h-4 text-[#2563EB] rounded"
                          />
                          <span className="text-sm text-[#111827]">{branch}</span>
                        </label>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleViewCurriculum(branch); }}
                          className="p-1 text-[#6B7280] hover:text-[#2563EB] hover:bg-white rounded-full"
                          title="View Curriculum"
                        >
                          <Info size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#111827] mb-2 block">Graduation Years *</label>
                  <div className="flex gap-2">
                    {yearOptions.map(year => (
                      <label key={year} className="flex items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                        <input
                          type="checkbox"
                          checked={years.includes(year)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setYears([...years, year]);
                            } else {
                              setYears(years.filter(y => y !== year));
                            }
                          }}
                          className="w-4 h-4 text-[#2563EB] rounded"
                        />
                        <span className="text-sm text-[#111827]">{year}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#2563EB]">
                <ListChecks size={24} />
                <h3 className="text-lg font-semibold text-[#111827]">Selection Process Flow</h3>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setProcess([...process, ''])}>
                <Plus size={16} />
                Add Round
              </Button>
            </div>
            <div className="space-y-3">
              {process.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <Input
                    value={step}
                    onChange={(e) => {
                      const newProcess = [...process];
                      newProcess[idx] = e.target.value;
                      setProcess(newProcess);
                    }}
                    placeholder={`Round ${idx + 1} (e.g., Technical Interview)`}
                  />
                  <button
                    onClick={() => setProcess(process.filter((_, i) => i !== idx))}
                    className="p-2 text-[#9CA3AF] hover:text-[#DC2626] transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-[#16A34A]">
              <IndianRupee size={24} />
              <h3 className="text-lg font-semibold text-[#111827]">Compensation Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Input
                  label="Total Annual CTC (in ₹) *"
                  type="number"
                  placeholder="1200000"
                  value={ctc}
                  onChange={(e) => setCTC(e.target.value)}
                  helperText="Enter the total annual cost to company"
                  required
                />
                {ctc && (
                  <div className="mt-2 p-3 bg-[#EFF6FF] rounded-lg border border-[#DBEAFE]">
                    <p className="text-sm text-[#6B7280]">Formatted CTC</p>
                    <p className="text-2xl font-bold text-[#2563EB]">
                      ₹{(parseFloat(ctc) / 100000).toFixed(2)} LPA
                    </p>
                  </div>
                )}
              </div>

              <Input
                label="Base Pay (Fixed)"
                type="number"
                placeholder="800000"
                value={basePay}
                onChange={(e) => setBasePay(e.target.value)}
              />
              <Input
                label="Variable / Bonus"
                type="number"
                placeholder="200000"
                value={variablePay}
                onChange={(e) => setVariablePay(e.target.value)}
              />

              <div className="col-span-2 pt-4 border-t border-[#E5E7EB]">
                <h4 className="text-sm font-medium text-[#111827] mb-3">Internship Stipend (if applicable)</h4>
                <Input
                  label="Monthly Stipend (in ₹)"
                  type="number"
                  placeholder="50000"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h3 className="text-[#111827] mb-6 text-xl font-bold">Review Your Drive</h3>

              <div className="space-y-8">
                {/* Basic Info Review */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#6B7280] mb-3 uppercase">
                    <Building2 size={16} /> Basic Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 bg-[#F9FAFB] p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Company</p>
                      <p className="font-medium text-[#111827]">{companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Location</p>
                      <p className="font-medium text-[#111827]">{location || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">HR Contact</p>
                      <p className="font-medium text-[#111827]">{hrName}</p>
                      <p className="text-xs text-[#6B7280]">{hrEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Mode</p>
                      <p className="font-medium text-[#111827]">{mode}</p>
                    </div>
                  </div>
                </div>

                {/* JD & Eligibility Review */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#6B7280] mb-3 uppercase">
                    <FileText size={16} /> Role & Eligibility
                  </h4>
                  <div className="bg-[#F9FAFB] p-4 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Role</p>
                        <p className="font-medium text-[#111827]">{role}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Deadline</p>
                        <p className="font-medium text-[#111827]">{deadline ? new Date(deadline).toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Eligibility</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 bg-white border rounded text-xs">Min CGPA: {minCGPA}</span>
                        <span className="px-2 py-1 bg-white border rounded text-xs">Max Backlogs: {maxBacklogs}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Allowed Branches</p>
                      <div className="flex flex-wrap gap-2">
                        {branches.map(b => (
                          <span key={b} className="px-2 py-1 bg-[#EFF6FF] text-[#2563EB] rounded text-xs font-medium">{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Review */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#6B7280] mb-3 uppercase">
                    <ListChecks size={16} /> Selection Process
                  </h4>
                  <div className="bg-[#F9FAFB] p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {process.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded border">
                          <span className="w-5 h-5 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                          <span className="text-sm">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compensation Review */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#6B7280] mb-3 uppercase">
                    <IndianRupee size={16} /> Compensation
                  </h4>
                  <div className="bg-gradient-to-r from-[#EFF6FF] to-[#E0F2FE] p-4 rounded-lg border border-[#BFDBFE]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Annual CTC</p>
                        <p className="text-2xl font-bold text-[#16A34A]">₹{(parseFloat(ctc) / 100000).toFixed(2)} LPA</p>
                      </div>
                      {stipend && (
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1">Internship Stipend</p>
                          <p className="text-xl font-bold text-[#16A34A]">₹{parseInt(stipend).toLocaleString()}/mo</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-4">
              <p className="text-sm text-[#92400E]">
                <strong>Note:</strong> Once submitted, your drive will be sent to the SPC for review.
                You'll be notified once it's approved or if changes are requested.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-[#E5E7EB] p-6">
        <Button
          variant="secondary"
          onClick={() => step === 1 ? onBack() : setStep(step - 1)}
        >
          <ArrowLeft size={18} />
          {step === 1 ? 'Cancel' : 'Previous'}
        </Button>
        {step < totalSteps ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight size={18} />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <CheckCircle size={18} />
            Submit for Review
          </Button>
        )}
      </div>

      {/* Curriculum Modal */}
      <Modal
        isOpen={showCurriculumModal}
        onClose={() => setShowCurriculumModal(false)}
        title={`${selectedBranchCurriculum} - Curriculum Highlights`}
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-[#EFF6FF] rounded-lg border border-[#DBEAFE]">
            <div className="flex items-center gap-2 mb-2 text-[#1E40AF]">
              <BookOpen size={18} />
              <h4 className="font-semibold">Key Subjects</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedBranchCurriculum && curriculumData[selectedBranchCurriculum]?.subjects.map(sub => (
                <span key={sub} className="px-2 py-1 bg-white text-[#1E40AF] text-xs rounded border border-[#BFDBFE]">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#ECFDF5] rounded-lg border border-[#D1FAE5]">
            <div className="flex items-center gap-2 mb-2 text-[#065F46]">
              <Sparkles size={18} />
              <h4 className="font-semibold">Key Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedBranchCurriculum && curriculumData[selectedBranchCurriculum]?.skills.map(skill => (
                <span key={skill} className="px-2 py-1 bg-white text-[#065F46] text-xs rounded border border-[#A7F3D0]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={() => setShowCurriculumModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
