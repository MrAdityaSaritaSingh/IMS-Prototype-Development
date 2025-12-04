
import React from 'react';
import { motion } from 'motion/react';
import { StatCard } from '../Card';
import { StatusChip } from '../StatusChip';
import { UpcomingDeadlines } from './UpcomingDeadlines';
import { Briefcase, FileText, Calendar, Award, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../Button';
import { mockDrives, mockApplications, mockOffers } from '../../data/mockData';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const publishedDrives = mockDrives.filter(d => d.status === 'published');
  const myApplications = mockApplications.filter(a => a.studentId === 'student1');
  const myOffers = mockOffers.filter(o => o.studentId === 'student1');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">Welcome back, Rajesh!</h2>
        <p className="text-[#6B7280]">Here's your placement journey overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Drives"
          value={publishedDrives.length}
          icon={<Briefcase size={24} />}
          onClick={() => onNavigate('browse-drives')}
        />
        <StatCard
          title="My Applications"
          value={myApplications.length}
          icon={<FileText size={24} />}
          onClick={() => onNavigate('my-applications')}
        />
        <StatCard
          title="Offers Received"
          value={myOffers.length}
          icon={<Award size={24} />}
          trend={{ value: '+1 this week', positive: true }}
          onClick={() => onNavigate('offers')}
        />
        <StatCard
          title="Interviews Scheduled"
          value={2}
          icon={<Calendar size={24} />}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button onClick={() => onNavigate('browse-drives')} className="w-full">
            <Briefcase size={18} />
            Browse Drives
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('my-applications')} className="w-full">
            <FileText size={18} />
            My Applications
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('offers')} className="w-full">
            <Award size={18} />
            View Offers
          </Button>
          <Button variant="secondary" className="w-full">
            <Calendar size={18} />
            Calendar
          </Button>
        </div>
      </div>

      {/* Timeline & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-[#16A34A]" />
            <h3 className="text-[#111827] font-semibold">My Placement Status Timeline</h3>
          </div>
          <div className="relative pl-4 border-l-2 border-[#E5E7EB] space-y-8">
            {mockApplications.map((app, idx) => {
              const drive = mockDrives.find(d => d.id === app.driveId);
              return (
                <div key={app.id} className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white ring-2 ring-[#E5E7EB]" />
                  <div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-[#111827]">{drive?.companyName}</h4>
                      <span className="text-xs text-[#6B7280]">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280] mb-2">{drive?.role}</p>
                    <div className="flex items-center gap-2">
                      <StatusChip status={app.status} />
                      {app.nextStep && (
                        <span className="text-xs text-[#2563EB] font-medium">
                          Next: {app.nextStep}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <UpcomingDeadlines drives={mockDrives} />
        </div>
      </div>
    </div>
  );
}

