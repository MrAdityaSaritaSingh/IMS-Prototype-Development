import { Drive, Application, Offer, User } from '../types';

export const mockUsers: Record<string, User> = {
  student1: {
    id: 'student1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@college.edu',
    role: 'student'
  },
  student2: {
    id: 'student2',
    name: 'Jesh umar',
    email: 'jesh.umar@college.edu',
    role: 'student'
  },
  spc1: {
    id: 'spc1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@college.edu',
    role: 'spc'
  },
  recruiter1: {
    id: 'recruiter1',
    name: 'Ankit Verma',
    email: 'ankit.verma@techcorp.com',
    role: 'recruiter'
  },
  recruiter2: {
    id: 'recruiter2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@cloudtech.com',
    role: 'recruiter'
  },
  recruiter_google: {
    id: 'recruiter_google',
    name: 'Larry Page',
    email: 'larry@google.com',
    role: 'recruiter'
  },
  recruiter_eightfold: {
    id: 'recruiter_eightfold',
    name: 'Ashutosh Garg',
    email: 'ashutosh@eightfold.ai',
    role: 'recruiter'
  },
  recruiter_nvidia: {
    id: 'recruiter_nvidia',
    name: 'Jensen Huang',
    email: 'jensen@nvidia.com',
    role: 'recruiter'
  }
};

export const mockDrives: Drive[] = [
  // Google Drives
  {
    id: 'drive_google_sde',
    companyName: 'Google',
    role: 'Software Engineer, University Graduate',
    ctc: 3200000,
    mode: 'On-Campus',
    location: 'Bangalore / Hyderabad',
    hrName: 'Larry Page',
    hrEmail: 'larry@google.com',
    stipend: 125000,
    eligibilityCriteria: {
      minCGPA: 8.0,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE', 'Dual Degree - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Join Google to build the future of technology. Working on core products like Search, Cloud, and AI.',
    process: ['Online Coding Challenge', 'Technical Interview 1', 'Technical Interview 2', 'Googlyness Round'],
    deadline: '2025-12-10T23:59:59',
    status: 'published',
    createdBy: 'recruiter_google',
    createdAt: '2025-11-20T10:00:00',
    registrations: 156
  },
  {
    id: 'drive_google_ai',
    companyName: 'Google',
    role: 'AI Engineer',
    ctc: 3500000,
    mode: 'On-Campus',
    location: 'Bangalore',
    hrName: 'Larry Page',
    hrEmail: 'larry@google.com',
    stipend: 130000,
    eligibilityCriteria: {
      minCGPA: 8.5,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE', 'Dual Degree - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Work on cutting-edge AI models and applications.',
    process: ['Coding Challenge', 'ML System Design', 'Technical Interview', 'Googlyness Round'],
    deadline: '2025-12-12T23:59:59',
    status: 'published',
    createdBy: 'recruiter_google',
    createdAt: '2025-11-21T10:00:00',
    registrations: 98
  },

  // Eightfold.ai Drives
  {
    id: 'drive_eightfold_ai',
    companyName: 'Eightfold.ai',
    role: 'AI Engineer',
    ctc: 4500000,
    mode: 'On-Campus',
    location: 'Noida',
    hrName: 'Ashutosh Garg',
    hrEmail: 'ashutosh@eightfold.ai',
    stipend: 100000,
    eligibilityCriteria: {
      minCGPA: 8.0,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Build the world\'s first Talent Intelligence Platform.',
    process: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'HR Round'],
    deadline: '2025-12-15T23:59:59',
    status: 'published',
    createdBy: 'recruiter_eightfold',
    createdAt: '2025-11-22T10:00:00',
    registrations: 75
  },

  // NVIDIA Drives
  {
    id: 'drive_nvidia_hw',
    companyName: 'NVIDIA',
    role: 'Hardware Engineer',
    ctc: 3800000,
    mode: 'On-Campus',
    location: 'Bangalore',
    hrName: 'Jensen Huang',
    hrEmail: 'jensen@nvidia.com',
    stipend: 85000,
    eligibilityCriteria: {
      minCGPA: 7.5,
      allowedBranches: ['B.Tech - EE', 'M.Tech - VLSI'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Powering the AI revolution. Hiring for GPU architecture and verification teams.',
    process: ['Technical Test', 'Technical Interview 1', 'Technical Interview 2', 'HR'],
    deadline: '2025-12-15T23:59:59',
    status: 'published',
    createdBy: 'recruiter_nvidia',
    createdAt: '2025-12-01T10:00:00',
    registrations: 45
  },
  {
    id: 'drive_nvidia_sde',
    companyName: 'NVIDIA',
    role: 'System Software Engineer',
    ctc: 4200000,
    mode: 'On-Campus',
    location: 'Pune',
    hrName: 'Jensen Huang',
    hrEmail: 'jensen@nvidia.com',
    stipend: 90000,
    eligibilityCriteria: {
      minCGPA: 8.0,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Develop system software for the world\'s most advanced GPUs.',
    process: ['Coding Test', 'Systems Interview', 'Technical Interview', 'HR'],
    deadline: '2025-12-18T23:59:59',
    status: 'published',
    createdBy: 'recruiter_nvidia',
    createdAt: '2025-12-02T10:00:00',
    registrations: 60
  },
  // EightCloud Drives
  {
    id: 'drive_eightcloud_devops',
    companyName: 'EightCloud',
    role: 'DevOps Engineer',
    ctc: 1800000,
    mode: 'On-Campus',
    location: 'Remote',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@techcorp.com',
    stipend: 45000,
    eligibilityCriteria: {
      minCGPA: 7.0,
      allowedBranches: ['B.Tech - CSE', 'B.Tech - IT'],
      allowedYears: ['2025'],
      maxBacklogs: 1
    },
    description: 'Join our DevOps team to build and maintain scalable infrastructure.',
    process: ['Online Assessment', 'Technical Interview', 'HR Round'],
    deadline: '2025-12-20T23:59:59',
    status: 'pending_review',
    createdBy: 'recruiter1',
    createdAt: '2025-12-04T09:00:00',
    registrations: 0
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    driveId: 'drive_nvidia_hw',
    studentId: 'student1',
    status: 'shortlisted',
    appliedAt: '2025-11-22T10:30:00',
    nextStep: 'Technical Interview on Dec 8, 2025 at 10:00 AM',
    resumeUrl: '/resume.pdf'
  },
  {
    id: 'app2',
    driveId: 'drive_eightfold_ai',
    studentId: 'student1',
    status: 'registered',
    appliedAt: '2025-11-26T14:20:00',
    nextStep: 'Aptitude Test - Dec 5, 2025',
    resumeUrl: '/resume.pdf'
  },
  {
    id: 'app3',
    driveId: 'drive_google_sde', // Student applied before eligibility change or special case
    studentId: 'student1',
    status: 'offered',
    appliedAt: '2025-11-18T09:15:00',
    nextStep: 'Accept or Decline offer',
    resumeUrl: '/resume.pdf'
  }
];

export const mockOffers: Offer[] = [
  {
    id: 'offer1',
    driveId: 'drive3',
    studentId: 'student1',
    companyName: 'Google',
    role: 'Full Stack Developer',
    ctc: 4500000,
    joiningDate: '2025-07-01',
    offerLetterUrl: '/offer-letter.pdf',
    status: 'pending'
  }
];
