import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, IndianRupee, Calendar, Clock, CheckCircle, FileText, Download, Edit, ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { Drive } from '../../types';
import { useToast } from '../Toast';
import { generateICSFile } from '../../utils/AddToCalendar';
import { SlotPicker } from './SlotPicker';

interface DriveDetailsProps {
  drive: Drive;
  onBack: () => void;
  onRegister: () => void;
  viewMode?: 'student' | 'recruiter';
  applicationStatus?: string;
}

export function DriveDetails({ drive, onBack, onRegister, viewMode = 'student', applicationStatus }: DriveDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'ctc' | 'process' | 'attachments' | 'interview'>('overview');
  const { showToast } = useToast();

  const formatCTC = (ctc: number) => `₹${(ctc / 100000).toFixed(1)} LPA`;
  const isEligible = drive.eligibilityCriteria.minCGPA <= 7.5;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'ctc', label: 'CTC Breakdown' },
    { id: 'process', label: 'Selection Process' },
    { id: 'attachments', label: 'Attachments' },
    ...(applicationStatus === 'shortlisted' ? [{ id: 'interview', label: 'Interview' }] : [])
  ] as const;

  // Mock slots for demo
  const mockSlots = [
    { id: 's1', startTime: '2025-12-10T09:00:00', status: 'available' },
    { id: 's2', startTime: '2025-12-10T10:00:00', status: 'booked' },
    { id: 's3', startTime: '2025-12-10T11:00:00', status: 'available' },
    { id: 's4', startTime: '2025-12-10T14:00:00', status: 'available' },
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
            <h2 className="text-[#111827]">Drive Details</h2>
            <p className="text-[#6B7280] text-sm">
              {viewMode === 'recruiter' ? 'Previewing drive details' : 'Review the drive information and register if eligible'}
            </p>
          </div>
        </div>
        {viewMode === 'recruiter' && (
          <Button variant="secondary">
            <Edit size={18} />
            Edit Drive
          </Button>
        )}
      </div>

      {/* Company Header Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{drive.companyName.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-[#111827] mb-1">{drive.companyName}</h2>
              <p className="text-[#6B7280] mb-2">{drive.role}</p>
              {viewMode === 'student' && (
                <StatusChip status={isEligible ? 'eligible' : 'not_eligible'} />
              )}
              {viewMode === 'recruiter' && (
                <StatusChip status={drive.status} />
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#6B7280] mb-1">Package</p>
            <p className="text-2xl font-bold text-[#16A34A]">{formatCTC(drive.ctc)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#6B7280]" />
            <div>
              <p className="text-xs text-[#6B7280]">Mode</p>
              <p className="text-sm font-medium text-[#111827]">{drive.mode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#6B7280]" />
            <div>
              <p className="text-xs text-[#6B7280]">Deadline</p>
              <p className="text-sm font-medium text-[#111827]">
                {new Date(drive.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#6B7280]" />
            <div>
              <p className="text-xs text-[#6B7280]">Posted</p>
              <p className="text-sm font-medium text-[#111827]">
                {new Date(drive.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-[#6B7280]" />
            <div>
              <p className="text-xs text-[#6B7280]">Registrations</p>
              <p className="text-sm font-medium text-[#111827]">{drive.registrations || 0} students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        <div className="border-b border-[#E5E7EB]">
          <div className="flex gap-1 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                    : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#111827] mb-2 font-semibold">About the Role</h3>
                <p className="text-[#6B7280] whitespace-pre-wrap">{drive.description}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-[#6B7280] bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {drive.location || 'Remote'}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Deadline: {new Date(drive.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1 text-[#16A34A] font-medium">
                  <IndianRupee size={16} />
                  {drive.ctc}
                </div>
                {drive.stipend && (
                  <div className="flex items-center gap-1 text-[#16A34A] font-medium">
                    <span className="text-xs bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#86EFAC]">
                      Stipend: ₹{drive.stipend.toLocaleString()}/mo
                    </span>
                  </div>
                )}
              </div>

              {drive.location && (
                <div>
                  <h3 className="text-[#111827] mb-2 font-semibold">Location</h3>
                  <p className="text-[#6B7280]">{drive.location}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F3F4F6] rounded-lg">
                  <p className="text-sm text-[#6B7280] mb-1">Minimum CGPA</p>
                  <p className="text-2xl font-bold text-[#111827]">{drive.eligibilityCriteria.minCGPA}</p>
                </div>
                <div className="p-4 bg-[#F3F4F6] rounded-lg">
                  <p className="text-sm text-[#6B7280] mb-1">Max Backlogs</p>
                  <p className="text-2xl font-bold text-[#111827]">{drive.eligibilityCriteria.maxBacklogs}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827] mb-2">Allowed Branches</p>
                <div className="flex flex-wrap gap-2">
                  {drive.eligibilityCriteria.allowedBranches.map(branch => (
                    <span key={branch} className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] rounded-lg text-sm font-medium">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827] mb-2">Graduation Years</p>
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
                <p className="text-sm font-medium text-[#6B7280] mb-1">Total Annual CTC</p>
                <p className="text-4xl font-bold text-[#2563EB]">{formatCTC(drive.ctc)}</p>
              </div>
              {drive.ctcBreakdown && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-[#F9FAFB] rounded-lg">
                    <p className="text-xs text-[#6B7280] mb-1">Base Pay</p>
                    <p className="font-semibold text-[#111827]">₹{(drive.ctcBreakdown.base / 100000).toFixed(1)} LPA</p>
                  </div>
                  <div className="p-4 bg-[#F9FAFB] rounded-lg">
                    <p className="text-xs text-[#6B7280] mb-1">Variable/Bonus</p>
                    <p className="font-semibold text-[#111827]">₹{(drive.ctcBreakdown.bonus / 100000).toFixed(1)} LPA</p>
                  </div>
                  <div className="p-4 bg-[#F9FAFB] rounded-lg">
                    <p className="text-xs text-[#6B7280] mb-1">Stocks/ESOPs</p>
                    <p className="font-semibold text-[#111827]">₹{(drive.ctcBreakdown.stocks / 100000).toFixed(1)} LPA</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-3">
              {drive.process && drive.process.length > 0 ? (
                drive.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#F3F4F6] rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#111827]">{step}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#6B7280]">No specific process details provided.</p>
              )}
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-3">
              <p className="text-sm text-[#6B7280] mb-4">
                Download attached documents for more details
              </p>
              {drive.attachments && drive.attachments.length > 0 ? (
                drive.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-[#6B7280]" />
                      <span className="text-sm font-medium text-[#111827]">Job Description.pdf</span>
                    </div>
                    <Download size={18} className="text-[#2563EB]" />
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F3F4F6] rounded-lg text-center text-[#6B7280]">
                  No attachments available
                </div>
              )}
            </div>
          )}

          {activeTab === 'interview' && (
            <SlotPicker
              slots={mockSlots}
              onSelect={(slotId) => console.log('Selected slot:', slotId)}
            />
          )}
        </div>
      </div>

      {/* Action Footer */}
      {viewMode === 'student' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E7EB] md:static md:border-0 md:bg-transparent md:p-0">
          <div className="flex gap-4 max-w-[1440px] mx-auto">
            <Button
              variant="secondary"
              className="flex-1 md:flex-none"
              onClick={() => {
                if (drive.events && drive.events.length > 0) {
                  generateICSFile(drive.events[0]);
                  showToast('Calendar event downloaded', 'success');
                } else {
                  generateICSFile({
                    title: `Deadline: ${drive.companyName} - ${drive.role}`,
                    description: `Application deadline for ${drive.role} at ${drive.companyName}`,
                    startTime: drive.deadline,
                    endTime: new Date(new Date(drive.deadline).getTime() + 60 * 60 * 1000).toISOString(),
                    location: 'Online'
                  });
                  showToast('Deadline added to calendar', 'success');
                }
              }}
            >
              <Calendar size={18} />
              Add to Calendar
            </Button>
            <Button
              className="flex-1 md:w-full"
              disabled={!isEligible}
              onClick={onRegister}
            >
              {isEligible ? 'Register Now' : 'Not Eligible'}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
