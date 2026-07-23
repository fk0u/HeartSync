import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useAppStore } from '../store/useAppStore';
import { Profile } from '../types/blood-pressure';

export function useProfiles() {
  const activeProfileId = useAppStore((state) => state.activeProfileId);
  const setActiveProfileId = useAppStore((state) => state.setActiveProfileId);

  // Fallback to empty array if live query returns undefined initially
  const profiles = useLiveQuery(() => db.profiles.toArray(), []) || [];
  
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Switch profile helper
  const switchProfile = (profileId: string) => {
    setActiveProfileId(profileId);
  };

  return {
    profiles,
    activeProfile,
    activeProfileId: activeProfile?.id || activeProfileId,
    switchProfile
  };
}
