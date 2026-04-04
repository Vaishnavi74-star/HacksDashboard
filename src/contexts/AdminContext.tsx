import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Judge, HackathonEvent } from '@/types/hackathon';

interface AdminContextType {
  adminName: string;
  setAdminName: (name: string) => void;
  judges: Judge[];
  setJudges: (judges: Judge[]) => void;
  events: HackathonEvent[];
  setEvents: (events: HackathonEvent[]) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultJudges: Judge[] = [
  { name: 'Dr. Priya Sharma', role: 'AI Research Lead, Google', bio: '15+ years in machine learning. Published 40+ papers on NLP and computer vision.', initials: 'PS' },
  { name: 'Arjun Mehta', role: 'CTO, TechNova', bio: 'Serial entrepreneur. Built 3 startups from zero to acquisition. Y Combinator alum.', initials: 'AM' },
  { name: 'Sarah Chen', role: 'VP Engineering, Meta', bio: 'Led teams building products used by 2B+ users. Passionate about developer tools.', initials: 'SC' },
  { name: 'Raj Patel', role: 'Partner, Sequoia Capital', bio: 'Early investor in 10+ unicorns. Focuses on deep-tech and climate startups.', initials: 'RP' },
];

const defaultEvents: HackathonEvent[] = [
  { iconName: 'Calendar', title: 'Registration Opens', date: 'March 1, 2026', desc: 'Sign up and form your dream team.' },
  { iconName: 'Users', title: 'Team Formation', date: 'March 10, 2026', desc: 'Find teammates, brainstorm ideas.' },
  { iconName: 'Code2', title: 'Hackathon Begins', date: 'March 15, 2026', desc: '48 hours of non-stop building.' },
  { iconName: 'Presentation', title: 'Mentorship Sessions', date: 'March 15-16', desc: 'Get guidance from industry experts.' },
  { iconName: 'Trophy', title: 'Final Demos', date: 'March 17, 2026', desc: 'Present to judges and audience.' },
  { iconName: 'PartyPopper', title: 'Awards Ceremony', date: 'March 17, 2026', desc: 'Celebrate winners and achievements.' },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [adminName, setAdminNameState] = useState<string>('HackDash');

  const [judges, setJudgesState] = useState<Judge[]>(defaultJudges);

  const [events, setEventsState] = useState<HackathonEvent[]>(defaultEvents);

  // Load from localStorage after component mounts
  useEffect(() => {
    try {
      const savedAdminName = localStorage.getItem('hackathon-admin-name');
      if (savedAdminName) {
        const parsed = JSON.parse(savedAdminName);
        if (typeof parsed === 'string') {
          setAdminNameState(parsed);
        }
      }
    } catch (error) {
      console.warn('Error loading admin name from localStorage:', error);
    }

    try {
      const savedJudges = localStorage.getItem('hackathon-judges');
      if (savedJudges) {
        const parsed = JSON.parse(savedJudges);
        if (Array.isArray(parsed) && parsed.every(j => j.name && j.role && j.bio && j.initials)) {
          setJudgesState(parsed);
        }
      }
    } catch (error) {
      console.warn('Error loading judges from localStorage:', error);
    }

    try {
      const savedEvents = localStorage.getItem('hackathon-events');
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed) && parsed.every(e => e.title && e.date && e.desc && e.iconName)) {
          setEventsState(parsed);
        }
      }
    } catch (error) {
      console.warn('Error loading events from localStorage:', error);
    }
  }, []);

  const setAdminName = (name: string) => {
    setAdminNameState(name);
    try {
      localStorage.setItem('hackathon-admin-name', JSON.stringify(name));
    } catch (error) {
      console.error('Error saving admin name to localStorage:', error);
    }
  };

  const setJudges = (newJudges: Judge[]) => {
    setJudgesState(newJudges);
    try {
      localStorage.setItem('hackathon-judges', JSON.stringify(newJudges));
    } catch (error) {
      console.error('Error saving judges to localStorage:', error);
    }
  };

  const setEvents = (newEvents: HackathonEvent[]) => {
    setEventsState(newEvents);
    try {
      localStorage.setItem('hackathon-events', JSON.stringify(newEvents));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  };

  return (
    <AdminContext.Provider value={{
      adminName,
      setAdminName,
      judges,
      setJudges,
      events,
      setEvents,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};