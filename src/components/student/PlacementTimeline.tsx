import React from 'react';
import { CheckCircle, Circle, Clock, ArrowRight } from 'lucide-react';
import { Application, Drive } from '../../types';
import { StatusChip } from '../StatusChip';

interface PlacementTimelineProps {
    applications: Application[];
    drives: Drive[];
}

export function PlacementTimeline({ applications, drives }: PlacementTimelineProps) {
    // Sort applications by date (newest first)
    const sortedApps = [...applications].sort((a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    );

    if (sortedApps.length === 0) {
        return (
            <div className="text-center py-8 text-[#6B7280]">
                <p>No active applications yet.</p>
                <p className="text-sm">Start applying to drives to see your timeline!</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {sortedApps.map((app, index) => {
                const drive = drives.find(d => d.id === app.driveId);
                if (!drive) return null;

                const isLast = index === sortedApps.length - 1;

                return (
                    <div key={app.id} className="relative pl-8">
                        {/* Connecting Line */}
                        {!isLast && (
                            <div className="absolute left-[11px] top-8 bottom-[-32px] w-0.5 bg-[#E5E7EB]" />
                        )}

                        {/* Status Icon */}
                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10
              ${app.status === 'offered' ? 'border-[#F59E0B] text-[#F59E0B]' :
                                app.status === 'rejected' ? 'border-[#DC2626] text-[#DC2626]' :
                                    app.status === 'shortlisted' ? 'border-[#2563EB] text-[#2563EB]' :
                                        'border-[#E5E7EB] text-[#9CA3AF]'}`}
                        >
                            {app.status === 'offered' ? <CheckCircle size={14} fill="currentColor" className="text-white" /> :
                                app.status === 'rejected' ? <Circle size={14} fill="currentColor" className="text-[#DC2626]" /> :
                                    <div className={`w-2 h-2 rounded-full ${app.status === 'shortlisted' ? 'bg-[#2563EB]' : 'bg-[#D1D5DB]'}`} />}
                        </div>

                        {/* Content Card */}
                        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold text-[#111827]">{drive.companyName}</h4>
                                    <p className="text-sm text-[#6B7280]">{drive.role}</p>
                                </div>
                                <span className="text-xs text-[#9CA3AF]">
                                    {new Date(app.appliedAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mt-3">
                                <StatusChip status={app.status} size="sm" />
                                {app.nextStep && (
                                    <div className="flex items-center gap-1 text-xs font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded">
                                        <Clock size={12} />
                                        Next: {app.nextStep}
                                    </div>
                                )}
                            </div>

                            {app.status === 'offered' && (
                                <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex justify-end">
                                    <button className="text-sm font-medium text-[#2563EB] flex items-center gap-1 hover:underline">
                                        View Offer <ArrowRight size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
