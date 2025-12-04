import React, { useState } from 'react';
import { Mail, Send, History, CheckCircle, Users, Plus } from 'lucide-react';
import { Button } from '../Button';
import { AudienceSelector } from './AudienceSelector';
import { MessageComposer } from './MessageComposer';
import { mockDrives } from '../../data/mockData';
import { useToast } from '../Toast';

export function CommunicationHub() {
    const [view, setView] = useState<'history' | 'compose'>('history');
    const { showToast } = useToast();
    const [audience, setAudience] = useState<{ type: string; count: number; driveId?: string } | null>(null);
    const [message, setMessage] = useState<{ subject: string; body: string; template: string } | null>(null);

    // Mock History Data
    const [history, setHistory] = useState([
        {
            id: 1,
            subject: 'TechCorp Shortlist Announced',
            audience: 'Applied to TechCorp',
            count: 45,
            sentAt: '2025-11-25T10:30:00',
            status: 'Sent'
        },
        {
            id: 2,
            subject: 'Upcoming Drive: DataWave',
            audience: 'All Students',
            count: 1200,
            sentAt: '2025-11-24T09:00:00',
            status: 'Sent'
        }
    ]);

    const handleSend = () => {
        if (!audience || !message || !message.subject || !message.body) {
            showToast('Please select audience and compose message', 'error');
            return;
        }

        // Mock Send
        const newLog = {
            id: history.length + 1,
            subject: message.subject,
            audience: audience.type === 'drive_specific' ? 'Drive Specific Group' : audience.type.replace('_', ' '),
            count: audience.count,
            sentAt: new Date().toISOString(),
            status: 'Sent'
        };

        setHistory([newLog, ...history]);
        showToast(`Message sent to ${audience.count} students`, 'success');
        setView('history');
        setAudience(null);
        setMessage(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[#111827]">Communication Hub</h2>
                    <p className="text-[#6B7280]">Manage bulk communications and announcements</p>
                </div>
                {view === 'history' && (
                    <Button onClick={() => setView('compose')}>
                        <Plus size={18} />
                        New Message
                    </Button>
                )}
            </div>

            {view === 'history' ? (
                <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
                    <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-2">
                        <History size={20} className="text-[#6B7280]" />
                        <h3 className="text-[#111827] font-semibold">Recent Communications</h3>
                    </div>
                    <div className="divide-y divide-[#E5E7EB]">
                        {history.map(item => (
                            <div key={item.id} className="p-4 hover:bg-[#F9FAFB] transition-colors flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[#111827]">{item.subject}</h4>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-[#6B7280]">
                                            <span className="flex items-center gap-1">
                                                <Users size={14} />
                                                {item.audience} ({item.count})
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(item.sentAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[#16A34A] text-sm font-medium">
                                    <CheckCircle size={16} />
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Mail size={20} className="text-[#2563EB]" />
                                <h3 className="text-[#111827] font-semibold">Compose Message</h3>
                            </div>
                            <MessageComposer onCompose={setMessage} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                            <AudienceSelector drives={mockDrives} onSelect={setAudience} />
                        </div>

                        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                            <h3 className="text-sm font-medium text-[#111827] mb-4">Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#6B7280]">Audience:</span>
                                    <span className="font-medium text-[#111827]">
                                        {audience ? `${audience.count} recipients` : 'Not selected'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#6B7280]">Template:</span>
                                    <span className="font-medium text-[#111827]">
                                        {message?.template || 'None'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <Button variant="secondary" className="flex-1" onClick={() => setView('history')}>
                                    Cancel
                                </Button>
                                <Button className="flex-1" onClick={handleSend} disabled={!audience || !message?.subject}>
                                    <Send size={18} />
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
