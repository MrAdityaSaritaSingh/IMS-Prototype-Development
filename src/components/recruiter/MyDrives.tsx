import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Input, Select } from '../Input';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { mockDrives } from '../../data/mockData';
import { Drive } from '../../types';

interface MyDrivesProps {
  onViewDrive: (drive: Drive) => void;
}

export function MyDrives({ onViewDrive }: MyDrivesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const myDrives = mockDrives.filter(d => d.createdBy === 'recruiter1');

  const filteredDrives = myDrives.filter(drive => {
    const matchesSearch = drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drive.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || drive.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCTC = (ctc: number) => `₹${(ctc / 100000).toFixed(1)} LPA`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">My Drives</h2>
        <p className="text-[#6B7280]">View and manage all your placement drives</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
              <Input
                placeholder="Search drives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'draft', label: 'Draft' },
                { value: 'pending_review', label: 'Pending Review' },
                { value: 'published', label: 'Published' },
                { value: 'closed', label: 'Closed' }
              ]}
            />
          </div>
          <div className="md:col-span-2">
            <Button variant="secondary" className="w-full">
              <Filter size={18} />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'All Drives', value: myDrives.length, color: 'text-[#111827]' },
          { label: 'Published', value: myDrives.filter(d => d.status === 'published').length, color: 'text-[#16A34A]' },
          { label: 'Pending', value: myDrives.filter(d => d.status === 'pending_review').length, color: 'text-[#F59E0B]' },
          { label: 'Draft', value: myDrives.filter(d => d.status === 'draft').length, color: 'text-[#6B7280]' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <p className="text-sm text-[#6B7280] mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Drives Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F3F4F6] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Company & Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">CTC</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Mode</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[#111827]">Registrations</th>
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
                    <StatusChip status={drive.status} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#6B7280]">
                      {drive.status === 'published' ? (drive.registrations || 0) : '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewDrive(drive)}
                        className="p-2 hover:bg-[#EFF6FF] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} className="text-[#2563EB]" />
                      </button>
                      {drive.status === 'draft' && (
                        <>
                          <button
                            className="p-2 hover:bg-[#EFF6FF] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} className="text-[#6B7280]" />
                          </button>
                          <button
                            className="p-2 hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-[#DC2626]" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
