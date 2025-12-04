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
  }
};

export const mockDrives: Drive[] = [
  // MAANG Companies (Recruiter 1)
  {
    id: 'drive_google',
    companyName: 'Google',
    role: 'Software Engineer, University Graduate',
    ctc: 3200000,
    mode: 'On-Campus',
    location: 'Bangalore / Hyderabad',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@google.com',
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
    createdBy: 'recruiter1',
    createdAt: '2025-11-20T10:00:00',
    registrations: 156
  },
  {
    id: 'drive_amazon',
    companyName: 'Amazon',
    role: 'SDE I',
    ctc: 4500000,
    mode: 'On-Campus',
    location: 'Bangalore',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@amazon.com',
    stipend: 110000,
    eligibilityCriteria: {
      minCGPA: 7.5,
      allowedBranches: ['B.Tech - CSE', 'B.Tech - EE', 'M.Tech - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Come build the future with us. Hiring for AWS and Consumer teams.',
    process: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'Bar Raiser'],
    deadline: '2025-12-12T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-21T10:00:00',
    registrations: 142
  },
  {
    id: 'drive_netflix',
    companyName: 'Netflix',
    role: 'Senior Software Engineer (New Grad)',
    ctc: 6500000,
    mode: 'Remote',
    location: 'Remote / Mumbai',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@netflix.com',
    eligibilityCriteria: {
      minCGPA: 8.5,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Entertain the world. Looking for exceptional engineers who thrive on freedom and responsibility.',
    process: ['Take Home Assignment', 'System Design', 'Culture Fit', 'Technical Deep Dive'],
    deadline: '2025-12-20T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-25T10:00:00',
    registrations: 89
  },

  // HFT Companies (Recruiter 1)
  {
    id: 'drive_tower',
    companyName: 'Tower Research Capital',
    role: 'Quant Developer',
    ctc: 5200000,
    mode: 'On-Campus',
    location: 'Gurgaon',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@tower-research.com',
    stipend: 200000,
    eligibilityCriteria: {
      minCGPA: 8.5,
      allowedBranches: ['B.Tech - CSE', 'Dual Degree - CSE'],
      allowedYears: ['2025'],
      maxBacklogs: 0
    },
    description: 'Build ultra-low latency trading systems. Strong C++ and OS internals required.',
    process: ['Coding Test (C++)', 'Systems Interview', 'Algo Interview', 'HR'],
    deadline: '2025-12-08T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-18T10:00:00',
    registrations: 67
  },

  // Hardware Companies (Recruiter 1)
  {
    id: 'drive_nvidia',
    companyName: 'NVIDIA',
    role: 'Hardware Engineer',
    ctc: 3800000,
    mode: 'On-Campus',
    location: 'Bangalore',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@nvidia.com',
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
    status: 'pending_review',
    createdBy: 'recruiter1',
    createdAt: '2025-12-01T10:00:00',
    registrations: 0
  },

  // Generic / Other Recruiter Drives (Recruiter 2 - SHOULD NOT BE VISIBLE TO RECRUITER 1)
  {
    id: 'drive4',
    companyName: 'CloudTech Industries',
    role: 'DevOps Engineer',
    ctc: 11000000,
    mode: 'Off-Campus',
    eligibilityCriteria: {
      minCGPA: 7.0,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE'],
      allowedYears: ['2024', '2025'],
      maxBacklogs: 0
    },
    description: 'Join our DevOps team to work on cloud infrastructure and automation.',
    process: ['Technical Test', 'Practical Assignment', 'Technical Discussion', 'HR Round'],
    deadline: '2025-12-18T23:59:59',
    status: 'pending_review',
    createdBy: 'recruiter2', // Changed to recruiter2
    createdAt: '2025-12-01T11:00:00',
    reviewComments: ''
  },
  {
    id: 'drive5',
    companyName: 'FinanceFlow',
    role: 'Backend Developer',
    ctc: 7300000,
    mode: 'Virtual',
    eligibilityCriteria: {
      minCGPA: 7.2,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - PDM'],
      allowedYears: ['2024'],
      maxBacklogs: 0
    },
    description: 'Build robust backend systems for financial applications.',
    process: ['Online Test', 'Technical Round', 'System Design', 'Final Interview'],
    deadline: '2025-12-25T23:59:59',
    status: 'draft',
    createdBy: 'recruiter2', // Changed to recruiter2
    createdAt: '2025-12-02T16:00:00'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    driveId: 'drive1',
    studentId: 'student1',
    status: 'shortlisted',
    appliedAt: '2025-11-22T10:30:00',
    nextStep: 'Technical Interview on Dec 8, 2025 at 10:00 AM',
    resumeUrl: '/resume.pdf'
  },
  {
    id: 'app2',
    driveId: 'drive2',
    studentId: 'student1',
    status: 'registered',
    appliedAt: '2025-11-26T14:20:00',
    nextStep: 'Aptitude Test - Dec 5, 2025',
    resumeUrl: '/resume.pdf'
  },
  {
    id: 'app3',
    driveId: 'drive3',
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
    companyName: 'InnovateSoft',
    role: 'Full Stack Developer',
    ctc: 4500000,
    joiningDate: '2025-07-01',
    offerLetterUrl: '/offer-letter.pdf',
    status: 'pending'
  }
];
