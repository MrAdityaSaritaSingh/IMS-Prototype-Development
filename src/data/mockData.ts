import { Drive, Application, Offer, User } from '../types';

export const mockUsers: Record<string, User> = {
  student1: {
    id: 'student1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@college.edu',
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
  }
};

export const mockDrives: Drive[] = [
  {
    id: 'drive1',
    companyName: 'TechCorp Solutions',
    role: 'Software Development Engineer',
    ctc: 4200000,
    mode: 'On-Campus',
    location: 'Bangalore, India',
    hrName: 'Ankit Verma',
    hrEmail: 'ankit.verma@techcorp.com',
    stipend: 45000,
    eligibilityCriteria: {
      minCGPA: 7.0,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE', 'Dual Degree - CSE'],
      allowedYears: ['2024', '2025'],
      maxBacklogs: 0
    },
    description: 'TechCorp is looking for talented software engineers to join our product development team.',
    process: ['Online Assessment', 'Technical Interview Round 1', 'Technical Interview Round 2', 'HR Interview'],
    deadline: '2025-12-15T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-20T10:00:00',
    registrations: 45,
    events: [
      {
        id: 'evt1',
        title: 'Pre-Placement Talk',
        description: 'Introduction to TechCorp and Q&A',
        startTime: '2025-12-05T10:00:00',
        endTime: '2025-12-05T11:30:00',
        location: 'Auditorium'
      },
      {
        id: 'evt2',
        title: 'Online Assessment',
        description: 'Coding and Aptitude Test',
        startTime: '2025-12-08T14:00:00',
        endTime: '2025-12-08T16:00:00',
        location: 'Virtual'
      }
    ]
  },
  {
    id: 'drive2',
    companyName: 'DataWave Analytics',
    role: 'Data Analyst',
    ctc: 9000000,
    mode: 'Virtual',
    eligibilityCriteria: {
      minCGPA: 6.5,
      allowedBranches: ['B.Tech - CSE', 'M.Tech - CSE', 'M.Tech - CSIS'],
      allowedYears: ['2024', '2025'],
      maxBacklogs: 1
    },
    description: 'Join DataWave to work on cutting-edge data analytics projects.',
    process: ['Aptitude Test', 'Case Study', 'Technical Interview', 'HR Round'],
    deadline: '2025-12-20T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-25T14:00:00',
    registrations: 32
  },
  {
    id: 'drive3',
    companyName: 'InnovateSoft',
    role: 'Full Stack Developer',
    ctc: 1500000,
    mode: 'On-Campus',
    location: 'Hyderabad',
    eligibilityCriteria: {
      minCGPA: 7.5,
      allowedBranches: ['B.Tech - CSE', 'Dual Degree - CSE'],
      allowedYears: ['2024'],
      maxBacklogs: 0
    },
    description: 'Looking for passionate full-stack developers to build scalable applications.',
    process: ['Coding Assessment', 'System Design', 'Technical Interview', 'Managerial Round'],
    deadline: '2025-12-10T23:59:59',
    status: 'published',
    createdBy: 'recruiter1',
    createdAt: '2025-11-15T09:00:00',
    registrations: 28
  },
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
    createdBy: 'recruiter1',
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
    createdBy: 'recruiter1',
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
