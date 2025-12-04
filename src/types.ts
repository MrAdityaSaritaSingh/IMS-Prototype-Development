export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'spc' | 'recruiter';
  company?: string;
}

export interface Drive {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  ctc: number;
  mode: 'On-Campus' | 'Off-Campus' | 'Virtual';
  status: 'draft' | 'pending_review' | 'published' | 'closed';
  deadline: string;
  eligibilityCriteria: {
    minCGPA: number;
    allowedBranches: string[];
    allowedYears: string[];
    maxBacklogs: number;
  };
  ctcBreakdown?: {
    base: number;
    bonus: number;
    stocks: number;
  };
  description?: string;
  location?: string;
  hrName?: string;
  hrEmail?: string;
  stipend?: number;
  process: string[];
  attachments?: string[];
  createdBy: string;
  createdAt: string;
  registrations?: number;
  spcComments?: string;
  reviewComments?: string;
  events?: {
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    location?: string;
  }[];
}

export interface Application {
  id: string;
  driveId: string;
  studentId: string;
  status: 'registered' | 'shortlisted' | 'offered' | 'rejected' | 'accepted' | 'declined' | 'withdrawn';
  appliedAt: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  nextStep?: string;
}

export interface Offer {
  id: string;
  driveId: string;
  studentId: string;
  companyName: string;
  role: string;
  ctc: number;
  joiningDate: string;
  offerLetterUrl?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Schedule {
  id: string;
  driveId: string;
  type: 'test' | 'interview';
  date: string;
  time: string;
  venue?: string;
  students?: string[];
}
