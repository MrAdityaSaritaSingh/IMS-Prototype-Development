import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../Button';
import { useToast } from '../Toast';

interface SlotPickerProps {
    slots: any[];
    onSelect: (slotId: string) => void;
}

export function SlotPicker({ slots, onSelect }: SlotPickerProps) {
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const { showToast } = useToast();

    const handleConfirm = () => {
        if (selectedSlotId) {
            onSelect(selectedSlotId);
            showToast('Interview slot confirmed!', 'success');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar size={20} className="text-[#2563EB]" />
                    <h3 className="text-[#111827] font-semibold">Select Interview Slot</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {slots.map(slot => (
                        <div
                            key={slot.id}
                            onClick={() => slot.status === 'available' && setSelectedSlotId(slot.id)}
                            className={`p-4 rounded-lg border transition-all cursor-pointer relative
                ${selectedSlotId === slot.id
                                    ? 'bg-[#EFF6FF] border-[#2563EB] ring-1 ring-[#2563EB]'
                                    : slot.status === 'available'
                                        ? 'bg-white border-[#E5E7EB] hover:border-[#2563EB]'
                                        : 'bg-[#F3F4F6] border-[#E5E7EB] opacity-60 cursor-not-allowed'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={16} className={selectedSlotId === slot.id ? 'text-[#2563EB]' : 'text-[#6B7280]'} />
                                <span className={`font-medium ${selectedSlotId === slot.id ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
                                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-xs text-[#6B7280]">
                                {new Date(slot.startTime).toLocaleDateString()}
                            </p>
                            {selectedSlotId === slot.id && (
                                <div className="absolute top-2 right-2 text-[#2563EB]">
                                    <CheckCircle size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button onClick={handleConfirm} disabled={!selectedSlotId}>
                        Confirm Slot
                    </Button>
                </div>
            </div>
        </div>
    );
}
