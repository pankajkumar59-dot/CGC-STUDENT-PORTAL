/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { NotesAndBooksView } from './components/NotesAndBooksView';
import { DocumentReaderView } from './components/DocumentReaderView';
import { ExamVaultView } from './components/ExamVaultView';
import { CopilotView } from './components/CopilotView';
import { SyllabusView } from './components/SyllabusView';
import { OfflineVaultView } from './components/OfflineVaultView';
import { AttendanceModal } from './components/AttendanceModal';
import { TimetableModal } from './components/TimetableModal';
import { NoticeModal } from './components/NoticeModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { LoginModal } from './components/LoginModal';
import { VivaQuestionsModal } from './components/VivaQuestionsModal';
import { ResultsModal } from './components/ResultsModal';
import { UploadModal } from './components/UploadModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'notes' | 'copilot' | 'syllabus' | 'reader' | 'exam-vault' | 'vault'
  >('dashboard');
  const [viewHistory, setViewHistory] = useState<string[]>(['dashboard']);

  // Modals state
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVivaOpen, setIsVivaOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Copilot preloaded query
  const [copilotQuery, setCopilotQuery] = useState<string | undefined>(undefined);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const triggerToast = (msg: string, icon: string = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const navigateTo = (view: any) => {
    setViewHistory((prev) => [...prev, view]);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      const nextHistory = [...viewHistory];
      nextHistory.pop();
      const prevView = nextHistory[nextHistory.length - 1];
      setViewHistory(nextHistory);
      setCurrentView(prevView as any);
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleAskAi = (topic: string) => {
    setCopilotQuery(topic);
    navigateTo('copilot');
  };

  const handleDownloadFile = (fileName: string) => {
    triggerToast(`Downloading ${fileName} to Offline Vault...`, 'downloading');
    setTimeout(() => {
      triggerToast(`${fileName} saved to Offline Vault!`, 'offline_pin');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col antialiased">
      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        icon={toastIcon}
        onDismiss={() => setToastMessage(null)}
      />

      {/* Persistent App Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onBack={handleBack}
        unreadNotifsCount={2}
        onOpenNotices={() => setIsNoticesOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-16 pb-20">
        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={navigateTo}
            onOpenAttendance={() => setIsAttendanceOpen(true)}
            onOpenTimetable={() => setIsTimetableOpen(true)}
            onOpenResults={() => setIsResultsOpen(true)}
            onOpenNotices={() => setIsNoticesOpen(true)}
            onDownloadFile={handleDownloadFile}
            onOpenReader={() => navigateTo('reader')}
          />
        )}

        {currentView === 'notes' && (
          <NotesAndBooksView
            onOpenReader={() => navigateTo('reader')}
            onDownloadFile={handleDownloadFile}
            onOpenExamVault={() => navigateTo('exam-vault')}
            onOpenUploadPrompt={() => setIsUploadOpen(true)}
          />
        )}

        {currentView === 'reader' && (
          <DocumentReaderView
            onBack={handleBack}
            onAskAi={handleAskAi}
            onDownloadFile={handleDownloadFile}
            onShowVivaModal={() => setIsVivaOpen(true)}
          />
        )}

        {currentView === 'exam-vault' && (
          <ExamVaultView
            onBack={handleBack}
            onOpenReader={() => navigateTo('reader')}
            onDownloadFile={handleDownloadFile}
            onSolveWithAi={handleAskAi}
            onUploadSnap={() => setIsUploadOpen(true)}
          />
        )}

        {currentView === 'copilot' && (
          <CopilotView
            initialPrompt={copilotQuery}
            onClearPrompt={() => setCopilotQuery(undefined)}
          />
        )}

        {currentView === 'syllabus' && (
          <SyllabusView
            onOpenNotes={() => navigateTo('notes')}
            onAskAi={handleAskAi}
            onDownloadFile={handleDownloadFile}
          />
        )}

        {currentView === 'vault' && (
          <OfflineVaultView
            onBack={handleBack}
            onOpenReader={() => navigateTo('reader')}
            onExportPdf={handleDownloadFile}
          />
        )}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNav currentView={currentView} onNavigate={navigateTo} />

      {/* Overlays, Drawers & Modals */}
      <AttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        onNotify={triggerToast}
      />

      <TimetableModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        onNotify={triggerToast}
      />

      <ResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        onDownloadFile={handleDownloadFile}
      />

      <NoticeModal
        isOpen={isNoticesOpen}
        onClose={() => setIsNoticesOpen(false)}
        onDownloadFile={handleDownloadFile}
        onNotify={triggerToast}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenLogin={() => {
          setIsProfileOpen(false);
          setIsLoginOpen(true);
        }}
        onNotify={triggerToast}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onNotify={triggerToast}
      />

      <VivaQuestionsModal
        isOpen={isVivaOpen}
        onClose={() => setIsVivaOpen(false)}
        onAskCopilot={handleAskAi}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onNotify={triggerToast}
      />
    </div>
  );
}
