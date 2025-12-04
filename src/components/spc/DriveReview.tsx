import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { TextArea } from '../Input';
import { useToast } from '../Toast';
import { Drive } from '../../types';

interface DriveReviewProps {
  drive: Drive;
  onBack: () => void;
  onApprove: () => void;
}

export function DriveReview({ drive, onBack, onApprove }: DriveReviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'ctc' | 'process' | 'files'>('overview');
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [comments, setComments] = useState('');
  const { showToast } = useToast();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'ctc', label: 'CTC' },
    { id: 'process', label: 'Process' },
    { id: 'files', label: 'Files' }
  ] as const;

  const formatCTC = (ctc: number) => `₹${(ctc / 100000).toFixed(1)} LPA`;

  const handleRequestChanges = () => {
    if (!comments.trim()) {
      showToast('Please provide comments', 'error');
      return;
    }
    showToast('Feedback sent to recruiter', 'success');
    setShowRequestChangesModal(false);
    setTimeout(onBack, 1000);
  };

  const handleApprove = () => {
    showToast('Drive approved and published!', 'success');
    setShowApproveModal(false);
    setTimeout(onApprove, 1000);
  };

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
            <h2 className="text-[#111827]">Review Drive</h2>
            <p className="text-[#6B7280] text-sm">{drive.companyName} - {drive.role}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowRequestChangesModal(true)}
          >
            <MessageSquare size={18} />
            Request Changes
          </Button>
          <Button
            onClick={() => setShowApproveModal(true)}
            className="bg-[#16A34A] hover:bg-[#15803D]"
          >
            <CheckCircle size={18} />
            Approve & Publish
          </Button>
        </div>
      </div>

      {/* Review Alert */}
      <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#92400E] mb-1">Action Required</p>
            <p className="text-sm text-[#92400E]">
              Please review all tabs carefully before approving. Once approved, the drive will be
              visible to all eligible students.
            </p>
          </div>
        </div>
      </div>

      {/* Drive Details Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{drive.companyName.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-[#111827] mb-1">{drive.companyName}</h3>
            <p className="text-[#6B7280]">{drive.role}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB] mb-6">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2
                  ${activeTab === tab.id
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-3 uppercase">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Company</p>
                    <p className="font-medium text-[#111827]">{drive.companyName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Role</p>
                    <p className="font-medium text-[#111827]">{drive.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Location</p>
                    <p className="font-medium text-[#111827]">{drive.location || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">HR Contact</p>
                    <p className="font-medium text-[#111827]">{drive.hrName || 'N/A'}</p>
                    <p className="text-xs text-[#6B7280]">{drive.hrEmail}</p>
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-3 uppercase">Compensation</h4>
                <div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Annual CTC</p>
                      <p className="text-xl font-bold text-[#16A34A]">{formatCTC(drive.ctc)}</p>
                    </div>
                    {drive.stipend && (
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Internship Stipend</p>
                        <p className="text-lg font-bold text-[#16A34A]">₹{drive.stipend.toLocaleString()}/mo</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#111827] mb-1 block">Role Description</label>
                <p className="text-[#6B7280]">{drive.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#111827] mb-1 block">Mode</label>
                  <p className="text-[#6B7280]">{drive.mode}</p>
                </div>
                {drive.location && (
                  <div>
                    <label className="text-sm font-medium text-[#111827] mb-1 block">Location</label>
                    <p className="text-[#6B7280]">{drive.location}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-[#111827] mb-1 block">Deadline</label>
                  <p className="text-[#6B7280]">
                    {new Date(drive.deadline).toLocaleDateString('en-IN', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F3F4F6] rounded-lg">
                  <label className="text-sm font-medium text-[#6B7280] mb-1 block">Minimum CGPA</label>
                  <p className="text-2xl font-bold text-[#111827]">{drive.eligibilityCriteria.minCGPA}</p>
                </div>
                <div className="p-4 bg-[#F3F4F6] rounded-lg">
                  <label className="text-sm font-medium text-[#6B7280] mb-1 block">Max Backlogs</label>
                  <p className="text-2xl font-bold text-[#111827]">{drive.eligibilityCriteria.maxBacklogs}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827] mb-2 block">Allowed Branches</label>
                <div className="flex flex-wrap gap-2">
                  {drive.eligibilityCriteria.allowedBranches.map(branch => (
                    <span key={branch} className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-sm font-medium">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827] mb-2 block">Graduation Years</label>
                <div className="flex flex-wrap gap-2">
                  {drive.eligibilityCriteria.allowedYears.map(year => (
                    <span key={year} className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-sm font-medium">
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ctc' && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-[#EFF6FF] to-[#E0F2FE] rounded-lg border border-[#2563EB]/20">
                <label className="text-sm font-medium text-[#6B7280] mb-1 block">Total Annual CTC</label>
                <p className="text-4xl font-bold text-[#2563EB]">{formatCTC(drive.ctc)}</p>
              </div>
              <div className="text-sm text-[#6B7280]">
                <p>Review the CTC structure and ensure it's aligned with industry standards for this role.</p>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-3">
              {drive.process.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#F3F4F6] rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#111827]">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-3">
              <p className="text-sm text-[#6B7280] mb-4">
                Review attachments provided by the recruiter
              </p>
              <div className="p-4 bg-[#F3F4F6] rounded-lg text-center text-[#6B7280]">
                No attachments available
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Request Changes Modal */}
      <Modal
        isOpen={showRequestChangesModal}
        onClose={() => setShowRequestChangesModal(false)}
        title="Request Changes"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[#6B7280]">
            Provide specific feedback to the recruiter about what needs to be changed or clarified.
          </p>
          <TextArea
            label="Comments *"
            rows={6}
            placeholder="Enter your feedback here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowRequestChangesModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleRequestChanges} className="flex-1">
              Send Feedback
            </Button>
          </div>
        </div>
      </Modal>

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve & Publish Drive"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[#6B7280]">
            Are you sure you want to approve and publish this drive? Once published, eligible students
            will be able to view and register for this opportunity.
          </p>
          <div className="p-4 bg-[#DCFCE7] border border-[#16A34A] rounded-lg">
            <p className="text-sm text-[#166534]">
              <strong>Note:</strong> Students will receive notifications about this new placement opportunity.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowApproveModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApprove} className="flex-1 bg-[#16A34A] hover:bg-[#15803D]">
              <CheckCircle size={18} />
              Approve & Publish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
