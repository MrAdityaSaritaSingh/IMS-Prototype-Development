import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, IndianRupee, Calendar } from 'lucide-react';
import { Input, Select } from '../Input';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { mockDrives } from '../../data/mockData';
import { Drive } from '../../types';

interface BrowseDrivesProps {
  onSelectDrive: (drive: Drive) => void;
}

export function BrowseDrives({ onSelectDrive }: BrowseDrivesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [minCTC, setMinCTC] = useState('');
  const [filterEligible, setFilterEligible] = useState(false);

  const publishedDrives = mockDrives.filter(d => d.status === 'published');

  const filteredDrives = publishedDrives.filter(drive => {
    const matchesSearch = drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         drive.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = filterMode === 'all' || drive.mode === filterMode;
    const matchesCTC = !minCTC || drive.ctc >= parseInt(minCTC) * 100000;
    // For demo, assume student is eligible for drives with minCGPA <= 7.5
    const matchesEligible = !filterEligible || drive.eligibilityCriteria.minCGPA <= 7.5;
    
    return matchesSearch && matchesMode && matchesCTC && matchesEligible;
  });

  const formatCTC = (ctc: number) => {
    return `₹${(ctc / 100000).toFixed(1)} LPA`;
  };

  const getDaysLeft = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">Browse Placement Drives</h2>
        <p className="text-[#6B7280]">Explore and register for active placement opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
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
            <Select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              options={[
                { value: 'all', label: 'All Modes' },
                { value: 'On-Campus', label: 'On-Campus' },
                { value: 'Off-Campus', label: 'Off-Campus' },
                { value: 'Virtual', label: 'Virtual' }
              ]}
            />
          </div>
          <div className="md:col-span-3">
             <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={18} />
              <Input
                type="number"
                placeholder="Min CTC (LPA)"
                value={minCTC}
                onChange={(e) => setMinCTC(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 h-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg bg-white cursor-pointer hover:bg-[#F3F4F6] transition-colors">
              <input
                type="checkbox"
                checked={filterEligible}
                onChange={(e) => setFilterEligible(e.target.checked)}
                className="w-4 h-4 text-[#2563EB] rounded"
              />
              <span className="text-sm text-[#111827]">Eligible Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280]">
          Showing <span className="font-medium text-[#111827]">{filteredDrives.length}</span> drives
        </p>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDrives.map((drive, idx) => {
          const daysLeft = getDaysLeft(drive.deadline);
          const isEligible = drive.eligibilityCriteria.minCGPA <= 7.5;
          
          return (
            <motion.div
              key={drive.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectDrive(drive)}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:border-[#2563EB] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{drive.companyName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-[#111827] text-lg mb-0.5">{drive.companyName}</h3>
                    <p className="text-sm text-[#6B7280]">{drive.role}</p>
                  </div>
                </div>
                <StatusChip status={isEligible ? 'eligible' : 'not_eligible'} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee size={16} className="text-[#16A34A]" />
                  <span className="font-medium text-[#111827]">{formatCTC(drive.ctc)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-[#6B7280]" />
                  <span className="text-[#6B7280]">{drive.mode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase size={16} className="text-[#6B7280]" />
                  <span className="text-[#6B7280]">{drive.registrations || 0} registered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className={daysLeft <= 3 ? 'text-[#DC2626]' : 'text-[#6B7280]'} />
                  <span className={daysLeft <= 3 ? 'text-[#DC2626] font-medium' : 'text-[#6B7280]'}>
                    {daysLeft} days left
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{drive.description}</p>

              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <Button size="sm" className="flex-1" disabled={!isEligible}>
                  {isEligible ? 'View Details' : 'Not Eligible'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
