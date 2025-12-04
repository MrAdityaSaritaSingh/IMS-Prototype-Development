import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { Input } from '../Input';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { mockApplications, mockDrives } from '../../data/mockData';
import { useToast } from '../Toast';

interface MyApplicationsProps {
  onViewDrive: (driveId: string) => void;
}

export function MyApplications({ onViewDrive }: MyApplicationsProps) {
  const applications = mockApplications.filter(a => a.studentId === 'student1');
  const { showToast } = useToast();

  const handleWithdraw = (applicationId: string) => {
    // In a real app, this would call an API
    showToast('Application withdrawn successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">My Applications</h2>
        <p className="text-[#6B7280]">Track all your placement drive applications</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
              <Input
                placeholder="Search applications..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <Button variant="secondary" className="w-full">
              <Filter size={18} />
              Filter by Status
            </Button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Company & Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Applied On</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Next Step</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-[#111827]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {applications.map((app, idx) => {
                const drive = mockDrives.find(d => d.id === app.driveId);
                if (!drive) return null;

                return (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#111827]">{drive.companyName}</p>
                        <p className="text-sm text-[#6B7280]">{drive.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6B7280]">
                        {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusChip status={app.status} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6B7280]">{app.nextStep || '-'}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onViewDrive(drive.id)}
                      >
                        <ExternalLink size={16} />
                        View
                      </Button>
                      {app.status === 'registered' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="ml-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleWithdraw(app.id)}
                        >
                          Withdraw
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-sm text-[#6B7280] mb-1">Total Applications</p>
          <p className="text-2xl font-bold text-[#111827]">{applications.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-sm text-[#6B7280] mb-1">Shortlisted</p>
          <p className="text-2xl font-bold text-[#9333EA]">
            {applications.filter(a => a.status === 'shortlisted').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-sm text-[#6B7280] mb-1">Offers</p>
          <p className="text-2xl font-bold text-[#D97706]">
            {applications.filter(a => a.status === 'offered').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-sm text-[#6B7280] mb-1">In Progress</p>
          <p className="text-2xl font-bold text-[#2563EB]">
            {applications.filter(a => a.status === 'registered').length}
          </p>
        </div>
      </div>
    </div>
  );
}
