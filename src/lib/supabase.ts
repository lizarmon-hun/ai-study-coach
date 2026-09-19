import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DayPlan } from '../types';

export interface SavedPlan {
  id: string;
  goal: string;
  hours: string;
  days: DayPlan[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.trim() !== '' &&
    !supabaseUrl.includes('your-project') &&
    supabaseAnonKey &&
    supabaseAnonKey.trim() !== '' &&
    !supabaseAnonKey.includes('your_supabase_anon_key')
  );
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return supabaseInstance;
}

// LocalStorage fallback key
const LOCAL_STORAGE_KEY = 'ai_study_coach_plans';
const LOCAL_STORAGE_ACTIVE_KEY = 'ai_study_coach_active_id';

// Helper for LocalStorage fallback
function getLocalPlans(): SavedPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPlans(plans: SavedPlan[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plans));
  } catch {
    // ignore
  }
}

// Database Actions with automatic fallback
export async function getActivePlan(): Promise<SavedPlan | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        return data as SavedPlan;
      }
    } catch (e) {
      console.warn('Supabase fetch active plan failed, fallback to local:', e);
    }
  }

  // LocalStorage fallback
  const localPlans = getLocalPlans();
  const activeId = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY) : null;
  const active = localPlans.find((p) => p.id === activeId) || localPlans.find((p) => p.is_active) || localPlans[0];
  return active || null;
}

export async function getAllPlans(): Promise<SavedPlan[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .order('updated_at', { ascending: false });

      if (!error && data) {
        return data as SavedPlan[];
      }
    } catch (e) {
      console.warn('Supabase fetch all plans failed, fallback to local:', e);
    }
  }

  return getLocalPlans();
}

export async function saveStudyPlan(
  goal: string,
  hours: string,
  days: DayPlan[],
  existingId?: string
): Promise<SavedPlan> {
  const supabase = getSupabaseClient();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      // 1. If existingId is given, update it
      if (existingId) {
        const { data, error } = await supabase
          .from('study_plans')
          .update({
            goal,
            hours,
            days,
            is_active: true,
            updated_at: now,
          })
          .eq('id', existingId)
          .select()
          .single();

        if (!error && data) {
          return data as SavedPlan;
        }
      }

      // 2. Set other plans to is_active = false
      await supabase.from('study_plans').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');

      // 3. Insert new plan
      const { data, error } = await supabase
        .from('study_plans')
        .insert([
          {
            goal,
            hours,
            days,
            is_active: true,
            created_at: now,
            updated_at: now,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return data as SavedPlan;
      }
    } catch (e) {
      console.warn('Supabase save failed, fallback to local:', e);
    }
  }

  // LocalStorage fallback
  const localPlans = getLocalPlans();
  const planId = existingId || `plan-${Date.now()}`;
  const newPlan: SavedPlan = {
    id: planId,
    goal,
    hours,
    days,
    is_active: true,
    created_at: now,
    updated_at: now,
  };

  const updatedPlans = localPlans.map((p) => ({ ...p, is_active: false }));
  const existingIdx = updatedPlans.findIndex((p) => p.id === planId);

  if (existingIdx >= 0) {
    updatedPlans[existingIdx] = newPlan;
  } else {
    updatedPlans.unshift(newPlan);
  }

  saveLocalPlans(updatedPlans);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, planId);
  }
  return newPlan;
}

export async function updatePlanDays(id: string, days: DayPlan[]): Promise<boolean> {
  const supabase = getSupabaseClient();
  const now = new Date().toISOString();

  if (supabase) {
    try {
      const { error } = await supabase
        .from('study_plans')
        .update({ days, updated_at: now })
        .eq('id', id);

      if (!error) return true;
    } catch (e) {
      console.warn('Supabase update days failed, fallback to local:', e);
    }
  }

  // LocalStorage fallback
  const localPlans = getLocalPlans();
  const target = localPlans.find((p) => p.id === id);
  if (target) {
    target.days = days;
    target.updated_at = now;
    saveLocalPlans(localPlans);
    return true;
  }
  return false;
}

export async function setActivePlan(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      await supabase.from('study_plans').update({ is_active: false }).neq('id', id);
      const { error } = await supabase.from('study_plans').update({ is_active: true }).eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase setActive failed, fallback to local:', e);
    }
  }

  // LocalStorage fallback
  const localPlans = getLocalPlans();
  const updated = localPlans.map((p) => ({
    ...p,
    is_active: p.id === id,
  }));
  saveLocalPlans(updated);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, id);
  }
  return true;
}

export async function deletePlan(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { error } = await supabase.from('study_plans').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete failed, fallback to local:', e);
    }
  }

  // LocalStorage fallback
  const localPlans = getLocalPlans().filter((p) => p.id !== id);
  saveLocalPlans(localPlans);
  return true;
}
