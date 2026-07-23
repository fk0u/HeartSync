import { create } from 'zustand';
import { DateFilterRange, BPCategoryKey, BPReading } from '../types/blood-pressure';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppState {
  activeProfileId: string;
  dateFilter: DateFilterRange;
  customStartDate: string | null;
  customEndDate: string | null;
  searchQuery: string;
  categoryFilter: BPCategoryKey | 'all';
  theme: 'light' | 'dark' | 'system';
  
  // Modals
  isReadingModalOpen: boolean;
  editingReading: BPReading | null;
  isProfileModalOpen: boolean;
  isExportPdfModalOpen: boolean;
  isReminderModalOpen: boolean;
  
  // Toasts
  toasts: ToastMessage[];

  // Actions
  setActiveProfileId: (id: string) => void;
  setDateFilter: (range: DateFilterRange, start?: string, end?: string) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: BPCategoryKey | 'all') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Modal controllers
  openReadingModal: (readingToEdit?: BPReading | null) => void;
  closeReadingModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openExportPdfModal: () => void;
  closeExportPdfModal: () => void;
  openReminderModal: () => void;
  closeReminderModal: () => void;

  // Toast actions
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeProfileId: 'profile-self-default',
  dateFilter: '30days',
  customStartDate: null,
  customEndDate: null,
  searchQuery: '',
  categoryFilter: 'all',
  theme: 'system',

  isReadingModalOpen: false,
  editingReading: null,
  isProfileModalOpen: false,
  isExportPdfModalOpen: false,
  isReminderModalOpen: false,

  toasts: [],

  setActiveProfileId: (id) => set({ activeProfileId: id }),
  setDateFilter: (range, start = null, end = null) =>
    set({ dateFilter: range, customStartDate: start, customEndDate: end }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setTheme: (theme) => set({ theme }),

  openReadingModal: (readingToEdit = null) =>
    set({ isReadingModalOpen: true, editingReading: readingToEdit }),
  closeReadingModal: () => set({ isReadingModalOpen: false, editingReading: null }),
  
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),

  openExportPdfModal: () => set({ isExportPdfModalOpen: true }),
  closeExportPdfModal: () => set({ isExportPdfModalOpen: false }),

  openReminderModal: () => set({ isReminderModalOpen: true }),
  closeReminderModal: () => set({ isReminderModalOpen: false }),

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
