import React, { useState } from 'react';
import { Input, TextArea, Select } from '../Input';

interface MessageComposerProps {
    onCompose: (message: { subject: string; body: string; template: string }) => void;
}

export function MessageComposer({ onCompose }: MessageComposerProps) {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [template, setTemplate] = useState('custom');

    const templates = [
        { value: 'custom', label: 'Custom Message' },
        { value: 'shortlist', label: 'Shortlist Announcement' },
        { value: 'interview', label: 'Interview Schedule' },
        { value: 'offer', label: 'Offer Released' }
    ];

    const handleTemplateChange = (value: string) => {
        setTemplate(value);
        if (value === 'shortlist') {
            setSubject('Congratulations! You have been shortlisted');
            setBody('Dear Student,\n\nWe are pleased to inform you that you have been shortlisted for the next round of the selection process.\n\nPlease check the portal for further details.\n\nBest Regards,\nPlacement Cell');
        } else if (value === 'interview') {
            setSubject('Interview Schedule Update');
            setBody('Dear Student,\n\nYour interview has been scheduled. Please login to the portal to view your slot and venue details.\n\nBest Regards,\nPlacement Cell');
        } else if (value === 'offer') {
            setSubject('Offer Letter Released');
            setBody('Dear Student,\n\nCongratulations! You have received an offer. Please login to view and accept the offer letter.\n\nBest Regards,\nPlacement Cell');
        } else {
            setSubject('');
            setBody('');
        }
        onCompose({ subject, body, template: value });
    };

    const handleChange = (field: 'subject' | 'body', value: string) => {
        if (field === 'subject') setSubject(value);
        else setBody(value);
        onCompose({ subject: field === 'subject' ? value : subject, body: field === 'body' ? value : body, template });
    };

    return (
        <div className="space-y-4">
            <Select
                label="Use Template"
                options={templates}
                value={template}
                onChange={(e) => handleTemplateChange(e.target.value)}
            />
            <Input
                label="Subject"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => handleChange('subject', e.target.value)}
            />
            <TextArea
                label="Message Body"
                rows={6}
                placeholder="Type your message here..."
                value={body}
                onChange={(e) => handleChange('body', e.target.value)}
            />
        </div>
    );
}
