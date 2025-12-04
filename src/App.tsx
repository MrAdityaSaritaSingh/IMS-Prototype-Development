import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./components/Toast";
import { Login } from "./components/Login";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import {
  Home,
  Briefcase,
  FileText,
  Award,
  Clock,
  CheckCircle,
  Plus,
  Users,
} from "lucide-react";

// Student Components
import { StudentDashboard } from "./components/student/StudentDashboard";
import { BrowseDrives } from "./components/student/BrowseDrives";
import { DriveDetails } from "./components/student/DriveDetails";
import { RegistrationForm } from "./components/student/RegistrationForm";
import { MyApplications } from "./components/student/MyApplications";
import { OfferPage } from "./components/student/OfferPage";

// SPC Components
import { SPCDashboard } from './components/spc/SPCDashboard';
import { PendingDrives } from './components/spc/PendingDrives';
import { DriveReview } from './components/spc/DriveReview';
import { ActiveDrives } from './components/spc/ActiveDrives';
import { DriveManagement } from './components/spc/DriveManagement';
import { CommunicationHub } from './components/spc/CommunicationHub';

// Recruiter Components
import { RecruiterDashboard } from "./components/recruiter/RecruiterDashboard";
import { CreateDriveWizard } from "./components/recruiter/CreateDriveWizard";
import { MyDrives } from "./components/recruiter/MyDrives";

import { Sheet, SheetContent } from "./components/ui/sheet";
import { Drive } from "./types";
import { mockDrives, mockApplications } from "./data/mockData";

function AppContent() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] =
    useState<Drive | null>(null);

  if (!user) {
    return <Login />;
  }

  // Helper to close menu on mobile when navigating
  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  // Student Navigation Items
  const studentNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      onClick: () => handleNavClick("dashboard"),
    },
    {
      id: "browse-drives",
      label: "Browse Drives",
      icon: Briefcase,
      onClick: () => handleNavClick("browse-drives"),
    },
    {
      id: "my-applications",
      label: "My Applications",
      icon: FileText,
      onClick: () => handleNavClick("my-applications"),
    },
    {
      id: "offers",
      label: "Offers",
      icon: Award,
      onClick: () => handleNavClick("offers"),
    },
  ];

  // SPC Navigation Items
  const spcNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      onClick: () => handleNavClick("dashboard"),
    },
    {
      id: "pending-drives",
      label: "Pending Reviews",
      icon: Clock,
      onClick: () => handleNavClick("pending-drives"),
    },
    {
      id: "active-drives",
      label: "Active Drives",
      icon: Briefcase,
      onClick: () => handleNavClick("active-drives"),
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      onClick: () => handleNavClick("students"),
    },
    {
      id: "communication",
      label: "Communication",
      icon: FileText, // Reusing FileText as Mail icon is not imported in App.tsx yet, will fix if needed or use existing
      onClick: () => handleNavClick("communication"),
    },
  ];

  // Recruiter Navigation Items
  const recruiterNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      onClick: () => handleNavClick("dashboard"),
    },
    {
      id: "create-drive",
      label: "Create Drive",
      icon: Plus,
      onClick: () => handleNavClick("create-drive"),
    },
    {
      id: "my-drives",
      label: "My Drives",
      icon: Briefcase,
      onClick: () => handleNavClick("my-drives"),
    },
  ];

  const getNavItems = () => {
    switch (user.role) {
      case "student":
        return studentNavItems;
      case "spc":
        return spcNavItems;
      case "recruiter":
        return recruiterNavItems;
      default:
        return [];
    }
  };

  const handleSelectDrive = (drive: Drive) => {
    setSelectedDrive(drive);
    setCurrentPage("drive-details");
  };

  const handleViewDrive = (driveId: string) => {
    const drive = mockDrives.find((d) => d.id === driveId);
    if (drive) {
      handleSelectDrive(drive);
    }
  };

  const handleRegister = () => {
    setCurrentPage("registration-form");
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage("my-applications");
  };

  const handleReviewDrive = (drive: Drive) => {
    setSelectedDrive(drive);
    setCurrentPage("drive-review");
  };

  const handleManageDrive = (drive: Drive) => {
    setSelectedDrive(drive);
    setCurrentPage("drive-management");
  };

  const handleApproveDrive = () => {
    setCurrentPage("pending-drives");
  };

  const handleViewRecruiterDrive = (drive: Drive) => {
    setSelectedDrive(drive);
    setCurrentPage("drive-status");
  };

  const handleCreateDriveComplete = () => {
    setCurrentPage("my-drives");
  };

  const renderContent = () => {
    // Student Pages
    if (user.role === "student") {
      switch (currentPage) {
        case "dashboard":
          return (
            <StudentDashboard onNavigate={setCurrentPage} />
          );
        case "browse-drives":
          return (
            <BrowseDrives onSelectDrive={handleSelectDrive} />
          );
        case "drive-details": {
          if (!selectedDrive) return null;
          const app = mockApplications.find(a => a.driveId === selectedDrive.id && a.studentId === user.id);
          return (
            <DriveDetails
              drive={selectedDrive}
              onBack={() => setCurrentPage("browse-drives")}
              onRegister={handleRegister}
              applicationStatus={app?.status}
            />
          );
        }
        case "registration-form":
          return selectedDrive ? (
            <RegistrationForm
              drive={selectedDrive}
              onBack={() => setCurrentPage("drive-details")}
              onSuccess={handleRegistrationSuccess}
            />
          ) : null;
        case "my-applications":
          return (
            <MyApplications onViewDrive={handleViewDrive} />
          );
        case "offers":
          return <OfferPage />;
        default:
          return (
            <StudentDashboard onNavigate={setCurrentPage} />
          );
      }
    }

    // SPC Pages
    if (user.role === "spc") {
      switch (currentPage) {
        case "dashboard":
          return <SPCDashboard onNavigate={setCurrentPage} />;
        case "pending-drives":
          return (
            <PendingDrives onReviewDrive={handleReviewDrive} />
          );
        case "drive-review":
          return selectedDrive ? (
            <DriveReview
              drive={selectedDrive}
              onBack={() => setCurrentPage("pending-drives")}
              onApprove={handleApproveDrive}
            />
          ) : null;
        case "active-drives":
          return (
            <ActiveDrives onManageDrive={handleManageDrive} />
          );
        case "drive-management":
          return selectedDrive ? (
            <DriveManagement
              drive={selectedDrive}
              onBack={() => setCurrentPage("active-drives")}
            />
          ) : null;
        case "students":
          return (
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
              <Users
                size={48}
                className="text-[#9CA3AF] mx-auto mb-4"
              />
              <h3 className="text-[#111827] mb-2">
                Student Database
              </h3>
              <p className="text-[#6B7280]">
                This feature is under development
              </p>
            </div>

          );
        case "communication":
          return <CommunicationHub />;
        default:
          return <SPCDashboard onNavigate={setCurrentPage} />;
      }
    }

    // Recruiter Pages
    if (user.role === "recruiter") {
      switch (currentPage) {
        case "dashboard":
          return (
            <RecruiterDashboard onNavigate={setCurrentPage} />
          );
        case "create-drive":
          return (
            <CreateDriveWizard
              onBack={() => setCurrentPage("dashboard")}
              onComplete={handleCreateDriveComplete}
            />
          );
        case "my-drives":
          return (
            <MyDrives onViewDrive={handleViewRecruiterDrive} />
          );
        case "drive-status":
          return selectedDrive ? (
            <DriveDetails
              drive={selectedDrive}
              onBack={() => setCurrentPage("my-drives")}
              onRegister={() => { }}
              viewMode="recruiter"
            />
          ) : null;
        default:
          return (
            <RecruiterDashboard onNavigate={setCurrentPage} />
          );
      }
    }

    return null;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <TopNav
        user={user}
        onLogout={logout}
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onLogoClick={() => handleNavClick("dashboard")}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            items={navItems}
            activeItem={currentPage}
          />
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-[300px]">
            <Sidebar
              items={navItems}
              activeItem={currentPage}
              className="w-full h-full border-none static"
            />
          </SheetContent>
        </Sheet>

        <main
          className="flex-1 p-4 md:p-6 overflow-x-hidden max-w-[1440px]"
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}