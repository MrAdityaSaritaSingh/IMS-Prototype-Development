import React, { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { Drive } from '../../types';

interface AudienceSelectorProps {
    drives: Drive[];
    onSelect: (audience: { type: string; count: number; driveId?: string }) => void;
}

export function AudienceSelector({ drives, onSelect }: AudienceSelectorProps) {
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedDriveId, setSelectedDriveId] = useState<string>('');

    const audienceTypes = [
        { id: 'all_students', label: 'All Students', count: 1200 },
        { id: 'final_year', label: 'Final Year Students', count: 450 },
        { id: 'pre_final', label: 'Pre-Final Year Students', count: 480 },
        { id: 'drive_specific', label: 'Drive Specific Group', count: 0 }
    ];

    const handleTypeSelect = (typeId: string) => {
        setSelectedType(typeId);
        if (typeId !== 'drive_specific') {
            const type = audienceTypes.find(t => t.id === typeId);
            onSelect({ type: typeId, count: type?.count || 0 });
            setSelectedDriveId('');
        }
    };

    const handleDriveSelect = (driveId: string) => {
        setSelectedDriveId(driveId);
        const drive = drives.find(d => d.id === driveId);
        // Mock logic for count based on status
        const count = drive?.registrations || 0;
        onSelect({ type: 'drive_specific', count, driveId });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-[#111827]">Select Audience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {audienceTypes.map(type => (
                    <div
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between
              ${selectedType === type.id ? 'bg-[#EFF6FF] border-[#2563EB]' : 'bg-white border-[#E5E7EB] hover:bg-[#F9FAFB]'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Users size={18} className={selectedType === type.id ? 'text-[#2563EB]' : 'text-[#6B7280]'} />
                            <div>
                                <p className={`text-sm font-medium ${selectedType === type.id ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
                                    {type.label}
                                </p>
                                {type.id !== 'drive_specific' && (
                                    <p className="text-xs text-[#6B7280]">{type.count} recipients</p>
                                )}
                            </div>
                        </div>
                        {selectedType === type.id && <Check size={16} className="text-[#2563EB]" />}
                    </div>
                ))}
            </div>

            {selectedType === 'drive_specific' && (
                <div className="mt-4 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <label className="text-sm font-medium text-[#111827] mb-2 block">Select Drive</label>
                    <select
                        value={selectedDriveId}
                        onChange={(e) => handleDriveSelect(e.target.value)}
                        className="w-full p-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] outline-none focus:border-[#2563EB]"
                    >
                        <option value="">-- Select a Drive --</option>
                        {drives.map(drive => (
                            <option key={drive.id} value={drive.id}>
                                {drive.companyName} - {drive.role}
                            </option>
                        ))}
                    </select>
                    {selectedDriveId && (
                        <p className="text-xs text-[#6B7280] mt-2">
                            Targeting {drives.find(d => d.id === selectedDriveId)?.registrations || 0} registered students
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
