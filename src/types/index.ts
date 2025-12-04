export type UserRole = 'student' | 'spc' | 'recruiter';

export type DriveStatus = 'draft' | 'pending_review' | 'published' | 'closed';

export type ApplicationStatus = 
  | 'eligible' 
  | 'not_eligible' 
  | 'registered' 
  | 'shortlisted' 
  | 'offered' 
  | 'accepted'
  | 'declined'
  | 'closed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Drive {
  id: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  ctc: number;
  mode: 'On-Campus' | 'Off-Campus' | 'Virtual';
  location?: string;
  eligibilityCriteria: {
    minCGPA: number;
    allowedBranches: string[];
    allowedYears: string[];
    maxBacklogs: number;
  };
  description: string;
  process: string[];
  deadline: string;
  status: DriveStatus;
  createdBy: string;
  createdAt: string;
  reviewComments?: string;
  registrations?: number;
  attachments?: string[];
}

export interface Application {
  id: string;
  driveId: string;
  studentId: string;
  status: ApplicationStatus;
  appliedAt: string;
  nextStep?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface Offer {
  id: string;
  driveId: string;
  studentId: string;
  companyName: string;
  role: string;
  ctc: number;
  joiningDate?: string;
  offerLetterUrl?: string;
  status: 'pending' | 'accepted' | 'declined';
}
