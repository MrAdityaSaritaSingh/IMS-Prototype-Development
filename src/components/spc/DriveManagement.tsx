import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Calendar, FileText, Award, Upload, Bell, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useToast } from '../Toast';
import { Drive } from '../../types';
import { SlotManager } from './SlotManager';

interface DriveManagementProps {
    drive: Drive;
    onBack: () => void;
}

export function DriveManagement({ drive, onBack }: DriveManagementProps) {
    const [activeTab, setActiveTab] = useState<'registrations' | 'schedule' | 'shortlist' | 'offers'>('registrations');
    const { showToast } = useToast();

    const tabs = [
        { id: 'registrations', label: 'Registrations', icon: Users },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
        { id: 'shortlist', label: 'Shortlist', icon: FileText },
        { id: 'offers', label: 'Offers', icon: Award },
    ] as const;

    // Mock data for registrations
    const registrations = [
        { id: 1, name: 'Rajesh Kumar', rollNo: 'CS21001', branch: 'CSE', cgpa: 8.5, status: 'registered' },
        { id: 2, name: 'Priya Sharma', rollNo: 'CS21002', branch: 'CSE', cgpa: 9.1, status: 'shortlisted' },
        { id: 3, name: 'Amit Patel', rollNo: 'ECE21015', branch: 'ECE', cgpa: 7.8, status: 'registered' },
        { id: 4, name: 'Sneha Gupta', rollNo: 'CS21045', branch: 'CSE', cgpa: 8.2, status: 'rejected' },
    ];

    const handleNotifyStudents = () => {
        showToast('Notification sent to 156 eligible students', 'success');
    };

    const handleUploadShortlist = () => {
        showToast('Shortlist uploaded successfully', 'success');
    };

    const handlePublishOffers = () => {
        showToast('Offers published to selected students', 'success');
    };

    const handleSaveSlots = (slots: any[]) => {
        console.log('Saved slots:', slots);
        // In a real app, this would save to backend
    };

    const handleCloseDrive = () => {
        showToast('Drive closed successfully', 'success');
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
                        <h2 className="text-[#111827]">Manage Drive</h2>
                        <p className="text-[#6B7280] text-sm">{drive.companyName} - {drive.role}</p>
                    </div>
                </div>
                <Button variant="secondary" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200" onClick={handleCloseDrive}>
                    <XCircle size={18} />
                    Close Drive
                </Button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-1">
                <div className="flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${activeTab === tab.id
                                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                                    : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                {activeTab === 'registrations' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#111827] font-medium">Student Registrations</h3>
                            <Button variant="secondary" size="sm">
                                <Upload size={16} />
                                Export Data
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-[#6B7280]">Student Name</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-[#6B7280]">Roll No</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-[#6B7280]">Branch</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-[#6B7280]">CGPA</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-[#6B7280]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E5E7EB]">
                                    {registrations.map((reg) => (
                                        <tr key={reg.id}>
                                            <td className="px-4 py-3 text-[#111827] font-medium">{reg.name}</td>
                                            <td className="px-4 py-3 text-[#6B7280]">{reg.rollNo}</td>
                                            <td className="px-4 py-3 text-[#6B7280]">{reg.branch}</td>
                                            <td className="px-4 py-3 text-[#6B7280]">{reg.cgpa}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${reg.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                                                        reg.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'}`}>
                                                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <SlotManager driveId={drive.id} onSave={handleSaveSlots} />
                )}

                {activeTab === 'shortlist' && (
                    <div className="space-y-6 text-center py-8">
                        <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText size={32} className="text-[#2563EB]" />
                        </div>
                        <h3 className="text-[#111827] font-medium text-lg">Upload Shortlist</h3>
                        <p className="text-[#6B7280] max-w-md mx-auto">
                            Upload the list of shortlisted students for the next round. Supported formats: .xlsx, .csv
                        </p>
                        <div className="flex justify-center gap-3">
                            <Button variant="secondary">Download Template</Button>
                            <Button onClick={handleUploadShortlist}>
                                <Upload size={18} />
                                Upload File
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === 'offers' && (
                    <div className="space-y-6 text-center py-8">
                        <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award size={32} className="text-[#16A34A]" />
                        </div>
                        <h3 className="text-[#111827] font-medium text-lg">Final Offers</h3>
                        <p className="text-[#6B7280] max-w-md mx-auto">
                            Upload the final list of students who have been offered a position. This will update their status and notify them.
                        </p>
                        <div className="flex justify-center gap-3">
                            <Button variant="secondary">Download Template</Button>
                            <Button onClick={handlePublishOffers} className="bg-[#16A34A] hover:bg-[#15803D]">
                                <CheckCircle size={18} />
                                Publish Offers
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
