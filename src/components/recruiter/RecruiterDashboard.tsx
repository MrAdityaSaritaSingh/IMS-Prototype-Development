import React from 'react';
import { motion } from 'motion/react';
import { StatCard } from '../Card';
import { FileText, Clock, CheckCircle, Plus, Briefcase } from 'lucide-react';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { mockDrives } from '../../data/mockData';

interface RecruiterDashboardProps {
  onNavigate: (page: string) => void;
}

export function RecruiterDashboard({ onNavigate }: RecruiterDashboardProps) {
  const myDrives = mockDrives.filter(d => d.createdBy === 'recruiter1');
  const draftDrives = myDrives.filter(d => d.status === 'draft');
  const pendingDrives = myDrives.filter(d => d.status === 'pending_review');
  const publishedDrives = myDrives.filter(d => d.status === 'published');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#111827] mb-2">Recruiter Dashboard</h2>
          <p className="text-[#6B7280]">Manage your placement drives and track applications</p>
        </div>
        <Button onClick={() => onNavigate('create-drive')}>
          <Plus size={20} />
          Create New Drive
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Draft Drives"
          value={draftDrives.length}
          icon={<FileText size={24} />}
          onClick={() => onNavigate('my-drives')}
        />
        <StatCard
          title="Pending SPC Review"
          value={pendingDrives.length}
          icon={<Clock size={24} />}
          onClick={() => onNavigate('my-drives')}
        />
        <StatCard
          title="Published Drives"
          value={publishedDrives.length}
          icon={<CheckCircle size={24} />}
          trend={{ value: `${publishedDrives.reduce((sum, d) => sum + (d.registrations || 0), 0)} registrations`, positive: true }}
          onClick={() => onNavigate('my-drives')}
        />
        <StatCard
          title="Total Drives"
          value={myDrives.length}
          icon={<Briefcase size={24} />}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button onClick={() => onNavigate('create-drive')}>
            <Plus size={18} />
            Create New Drive
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('my-drives')}>
            <Briefcase size={18} />
            View All Drives
          </Button>
          <Button variant="secondary">
            <FileText size={18} />
            View Applications
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Drives */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#111827]">Recent Drives</h3>
            <button
              onClick={() => onNavigate('my-drives')}
              className="text-sm text-[#2563EB] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {myDrives.slice(0, 4).map((drive, idx) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition-colors cursor-pointer"
                onClick={() => onNavigate('my-drives')}
              >
                <div>
                  <p className="font-medium text-[#111827] text-sm">{drive.companyName}</p>
                  <p className="text-xs text-[#6B7280]">{drive.role}</p>
                </div>
                <StatusChip status={drive.status} size="sm" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Drive Performance */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h3 className="text-[#111827] mb-4">Drive Performance</h3>
          <div className="space-y-4">
            {publishedDrives.slice(0, 3).map((drive, idx) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#111827]">{drive.companyName}</p>
                  <p className="text-sm font-bold text-[#2563EB]">{drive.registrations || 0} registrations</p>
                </div>
                <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                  <div
                    className="bg-[#2563EB] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((drive.registrations || 0) * 2, 100)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      {draftDrives.length > 0 && (
        <div className="bg-gradient-to-r from-[#DBEAFE] to-[#E0F2FE] rounded-xl border border-[#2563EB] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-[#2563EB]" />
              <div>
                <h3 className="text-[#111827] mb-1">Draft Drives</h3>
                <p className="text-sm text-[#6B7280]">
                  You have {draftDrives.length} draft drive{draftDrives.length !== 1 ? 's' : ''} to complete
                </p>
              </div>
            </div>
            <Button onClick={() => onNavigate('my-drives')}>
              Continue Editing
            </Button>
          </div>
        </div>
      )}

      {pendingDrives.length > 0 && (
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl border border-[#F59E0B] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-[#F59E0B]" />
              <div>
                <h3 className="text-[#111827] mb-1">Awaiting SPC Review</h3>
                <p className="text-sm text-[#6B7280]">
                  {pendingDrives.length} drive{pendingDrives.length !== 1 ? 's' : ''} pending approval
                </p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => onNavigate('my-drives')}>
              View Status
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
