import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '../Button';
import { Input, Select } from '../Input';
import { useToast } from '../Toast';

interface SlotManagerProps {
    driveId: string;
    onSave: (slots: any[]) => void;
}

export function SlotManager({ driveId, onSave }: SlotManagerProps) {
    const { showToast } = useToast();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [duration, setDuration] = useState('30');
    const [interviewers, setInterviewers] = useState('1');

    const [generatedSlots, setGeneratedSlots] = useState<any[]>([]);

    const generateSlots = () => {
        if (!date || !startTime || !endTime) {
            showToast('Please select date and time range', 'error');
            return;
        }

        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const dur = parseInt(duration);
        const numInterviewers = parseInt(interviewers);

        const newSlots = [];
        let current = new Date(start);

        while (current < end) {
            const slotEnd = new Date(current.getTime() + dur * 60000);
            if (slotEnd > end) break;

            for (let i = 0; i < numInterviewers; i++) {
                newSlots.push({
                    id: `${date}-${current.getTime()}-${i}`,
                    startTime: current.toISOString(),
                    endTime: slotEnd.toISOString(),
                    interviewerId: i + 1,
                    status: 'available'
                });
            }
            current = slotEnd;
        }

        setGeneratedSlots(newSlots);
        showToast(`Generated ${newSlots.length} slots`, 'success');
    };

    const handleSave = () => {
        onSave(generatedSlots);
        showToast('Slots published successfully', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] font-semibold mb-4">Generate Interview Slots</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Input
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        label="Start Time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <Input
                        label="End Time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Select
                        label="Duration (mins)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        options={[
                            { value: '15', label: '15 mins' },
                            { value: '30', label: '30 mins' },
                            { value: '45', label: '45 mins' },
                            { value: '60', label: '60 mins' }
                        ]}
                    />
                    <Input
                        label="Parallel Panels"
                        type="number"
                        min="1"
                        value={interviewers}
                        onChange={(e) => setInterviewers(e.target.value)}
                    />
                </div>
                <Button onClick={generateSlots} className="w-full md:w-auto">
                    <Plus size={18} />
                    Generate Slots
                </Button>
            </div>

            {generatedSlots.length > 0 && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#111827] font-semibold">Preview Slots ({generatedSlots.length})</h3>
                        <Button onClick={handleSave}>
                            <Save size={18} />
                            Publish Slots
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                        {generatedSlots.map((slot, idx) => (
                            <div key={idx} className="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] text-sm">
                                <p className="font-medium text-[#111827]">
                                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p className="text-[#6B7280]">Panel {slot.interviewerId}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
