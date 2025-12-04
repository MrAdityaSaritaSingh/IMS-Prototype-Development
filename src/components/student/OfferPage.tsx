import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, IndianRupee, Calendar, Download, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { useToast } from '../Toast';
import { mockOffers } from '../../data/mockData';

export function OfferPage() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const { showToast } = useToast();

  const offers = mockOffers.filter(o => o.studentId === 'student1' && o.status === 'pending');

  const formatCTC = (ctc: number) => `₹${(ctc / 100000).toFixed(1)} LPA`;

  const handleAccept = () => {
    showToast('Offer accepted successfully!', 'success');
    showToast('Offer accepted successfully!', 'success');
    setShowAcceptModal(false);
    setSelectedOffer(null);
    setIsAcknowledged(false);
  };

  const handleDecline = () => {
    showToast('Offer declined', 'info');
    setShowDeclineModal(false);
    setSelectedOffer(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#111827] mb-2">My Offers</h2>
        <p className="text-[#6B7280]">Review and respond to your placement offers</p>
      </div>

      {offers.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
          <Award size={48} className="text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-[#111827] mb-2">No Active Offers</h3>
          <p className="text-[#6B7280]">You don't have any pending offers at the moment</p>
        </div>
      ) : (
        <div className="space-y-6">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl border-2 border-[#D97706] p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Award size={32} className="text-[#D97706]" />
                  </div>
                  <div>
                    <div className="inline-flex px-3 py-1 bg-[#D97706] text-white rounded-full text-sm font-medium mb-2">
                      🎉 Offer Received
                    </div>
                    <h3 className="text-[#111827] mb-1">{offer.companyName}</h3>
                    <p className="text-[#6B7280]">{offer.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6B7280] mb-1">Package Offered</p>
                  <p className="text-3xl font-bold text-[#16A34A]">{formatCTC(offer.ctc)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white/70 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <IndianRupee size={20} className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280]">Total CTC</p>
                    <p className="font-bold text-[#111827]">{formatCTC(offer.ctc)}</p>
                  </div>
                </div>
                {offer.joiningDate && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Calendar size={20} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Joining Date</p>
                      <p className="font-bold text-[#111827]">
                        {new Date(offer.joiningDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {offer.offerLetterUrl && (
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="secondary" className="w-full">
                      <Download size={16} />
                      Download Offer Letter
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/70 rounded-lg mb-6">
                <h3 className="text-sm font-semibold text-[#111827] mb-3">CTC Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">Base Salary</span>
                    <span className="text-sm font-bold text-[#111827]">{formatCTC(offer.ctc * 0.7)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">Variable Pay</span>
                    <span className="text-sm font-bold text-[#111827]">{formatCTC(offer.ctc * 0.2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">Benefits & Perks</span>
                    <span className="text-sm font-bold text-[#111827]">{formatCTC(offer.ctc * 0.1)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setSelectedOffer(offer.id);
                    setShowAcceptModal(true);
                  }}
                  className="flex-1 bg-[#16A34A] hover:bg-[#15803D]"
                >
                  <CheckCircle size={20} />
                  Accept Offer
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedOffer(offer.id);
                    setShowDeclineModal(true);
                  }}
                  className="flex-1"
                >
                  <XCircle size={20} />
                  Decline Offer
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Accept Confirmation Modal */}
      <Modal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        title="Accept Offer"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[#6B7280]">
            Are you sure you want to accept this offer? This action cannot be undone and you will be
            marked as placed for this recruitment cycle.
          </p>
          <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
            <p className="text-sm text-[#92400E]">
              <strong>Important:</strong> By accepting this offer, you agree to join the company on the
              specified date and will be removed from other active placement drives.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2">
            <input
              type="checkbox"
              id="acknowledge"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="acknowledge" className="text-sm text-[#374151]">
              I acknowledge that I have read and understood the terms of this offer and agree to abide by the placement policy.
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowAcceptModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 bg-[#16A34A] hover:bg-[#15803D]"
              disabled={!isAcknowledged}
            >
              Confirm Accept
            </Button>
          </div>
        </div>
      </Modal>

      {/* Decline Confirmation Modal */}
      <Modal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        title="Decline Offer"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[#6B7280]">
            Are you sure you want to decline this offer? This action cannot be undone.
          </p>
          <div className="p-4 bg-[#FEE2E2] border border-[#DC2626] rounded-lg">
            <p className="text-sm text-[#7F1D1D]">
              <strong>Warning:</strong> Once declined, you cannot revert this decision. Make sure you
              have discussed this with your placement coordinator if required.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowDeclineModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDecline} className="flex-1">
              Confirm Decline
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
