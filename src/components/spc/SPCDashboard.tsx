import React from 'react';
import { motion } from 'motion/react';
import { StatCard } from '../Card';
import { Clock, Briefcase, AlertCircle, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Button } from '../Button';
import { mockDrives } from '../../data/mockData';
import { StatusChip } from '../StatusChip';

interface SPCDashboardProps {
  onNavigate: (page: string) => void;
}

export function SPCDashboard({ onNavigate }: SPCDashboardProps) {
  const pendingReview = mockDrives.filter(d => d.status === 'pending_review');
  const activeDrives = mockDrives.filter(d => d.status === 'published');
  const closingSoon = activeDrives.filter(d => {
    const daysLeft = Math.ceil((new Date(d.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 3;
  });

  const todaysTasks = [
    { task: 'Review CloudTech Industries drive', priority: 'high', time: 'Today' },
    { task: 'Publish shortlist for TechCorp', priority: 'medium', time: '2 hours ago' },
    { task: 'Schedule interviews for DataWave', priority: 'medium', time: 'Tomorrow' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">SPC Dashboard</h2>
        <p className="text-[#6B7280]">Manage placement drives and student applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Review"
          value={pendingReview.length}
          icon={<Clock size={24} />}
          trend={{ value: '+1 new', positive: false }}
          onClick={() => onNavigate('pending-drives')}
        />
        <StatCard
          title="Active Drives"
          value={activeDrives.length}
          icon={<Briefcase size={24} />}
          onClick={() => onNavigate('active-drives')}
        />
        <StatCard
          title="Closing Soon"
          value={closingSoon.length}
          icon={<AlertCircle size={24} />}
        />
        <StatCard
          title="Total Students"
          value={156}
          icon={<Users size={24} />}
          trend={{ value: '+12 eligible', positive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button onClick={() => onNavigate('pending-drives')}>
            <Clock size={18} />
            Review Pending Drives
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('active-drives')}>
            <Briefcase size={18} />
            Manage Active Drives
          </Button>
          <Button variant="secondary">
            <Users size={18} />
            View Student Database
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-[#2563EB]" />
            <h3 className="text-[#111827]">Today's Tasks</h3>
          </div>
          <div className="space-y-3">
            {todaysTasks.map((task, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start justify-between p-3 bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-[#2563EB] rounded" />
                  <div>
                    <p className="font-medium text-[#111827] text-sm">{task.task}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{task.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Drive Activity */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-[#16A34A]" />
            <h3 className="text-[#111827]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {activeDrives.slice(0, 3).map((drive, idx) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start justify-between p-3 bg-[#F3F4F6] rounded-lg hover:bg-[#E5E7EB] transition-colors cursor-pointer"
                onClick={() => onNavigate('active-drives')}
              >
                <div>
                  <p className="font-medium text-[#111827] text-sm">{drive.companyName}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{drive.registrations || 0} registrations</p>
                </div>
                <StatusChip status={drive.status} size="sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Drives Requiring Attention */}
      {pendingReview.length > 0 && (
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl border border-[#F59E0B] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={24} className="text-[#F59E0B]" />
              <div>
                <h3 className="text-[#111827] mb-1">Drives Pending Your Review</h3>
                <p className="text-sm text-[#6B7280]">
                  {pendingReview.length} drive{pendingReview.length !== 1 ? 's' : ''} waiting for approval
                </p>
              </div>
            </div>
            <Button onClick={() => onNavigate('pending-drives')}>
              Review Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
