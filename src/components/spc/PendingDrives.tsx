import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Eye, Clock, Calendar } from 'lucide-react';
import { Input } from '../Input';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { mockDrives } from '../../data/mockData';
import { Drive } from '../../types';

interface PendingDrivesProps {
  onReviewDrive: (drive: Drive) => void;
}

export function PendingDrives({ onReviewDrive }: PendingDrivesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const pendingDrives = mockDrives.filter(d => d.status === 'pending_review');

  const filteredDrives = pendingDrives.filter(drive =>
    drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drive.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCTC = (ctc: number) => `₹${(ctc / 100000).toFixed(1)} LPA`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">Pending Drive Reviews</h2>
        <p className="text-[#6B7280]">Review and approve placement drives submitted by recruiters</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-9">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
              <Input
                placeholder="Search by company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <Button variant="secondary" className="w-full">
              <Filter size={18} />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280]">
          <span className="font-medium text-[#111827]">{filteredDrives.length}</span> drive{filteredDrives.length !== 1 ? 's' : ''} pending review
        </p>
      </div>

      {/* Pending Drives Table */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
          <Clock size={48} className="text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-[#111827] mb-2">No Pending Reviews</h3>
          <p className="text-[#6B7280]">All drives have been reviewed</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F3F4F6] border-b border-[#E5E7EB]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Company & Role</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">CTC</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Mode</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Submitted On</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-[#111827]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredDrives.map((drive, idx) => (
                  <motion.tr
                    key={drive.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{drive.companyName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{drive.companyName}</p>
                          <p className="text-sm text-[#6B7280]">{drive.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#16A34A]">{formatCTC(drive.ctc)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6B7280]">{drive.mode}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#6B7280]" />
                        <p className="text-sm text-[#6B7280]">
                          {new Date(drive.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusChip status="pending_review" size="sm" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        onClick={() => onReviewDrive(drive)}
                      >
                        <Eye size={16} />
                        Review
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
