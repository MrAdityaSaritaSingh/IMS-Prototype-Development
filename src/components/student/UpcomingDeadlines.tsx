import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Drive } from '../../types';
import { generateICSFile } from '../../utils/AddToCalendar';

interface UpcomingDeadlinesProps {
    drives: Drive[];
}

export function UpcomingDeadlines({ drives }: UpcomingDeadlinesProps) {
    // Filter drives with future deadlines and sort by date
    const upcomingDrives = drives
        .filter(d => new Date(d.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        .slice(0, 3); // Show top 3

    if (upcomingDrives.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-[#2563EB]" />
                    <h3 className="text-[#111827] font-semibold">Upcoming Deadlines</h3>
                </div>
                <p className="text-[#6B7280] text-sm">No upcoming deadlines.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-[#2563EB]" />
                <h3 className="text-[#111827] font-semibold">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-4">
                {upcomingDrives.map(drive => (
                    <div key={drive.id} className="flex items-start justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                        <div>
                            <p className="text-sm font-medium text-[#111827]">{drive.companyName}</p>
                            <p className="text-xs text-[#6B7280]">{drive.role}</p>
                            <p className="text-xs text-[#DC2626] font-medium mt-1">
                                Due: {new Date(drive.deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <button
                            onClick={() => generateICSFile({
                                title: `Deadline: ${drive.companyName}`,
                                description: `Application deadline for ${drive.role}`,
                                startTime: drive.deadline,
                                endTime: new Date(new Date(drive.deadline).getTime() + 60 * 60 * 1000).toISOString(),
                                location: 'Online'
                            })}
                            className="p-2 text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors"
                            title="Add to Calendar"
                        >
                            <Calendar size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
