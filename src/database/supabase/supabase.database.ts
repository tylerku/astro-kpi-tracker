import { SupabaseClient, createClient } from "@supabase/supabase-js";
import IDatabase from '../database.interface'
import { DailyKPI, TIMEZONE, User } from "@/models";

export default class SupabaseDatabase implements IDatabase {
  private static instance: SupabaseDatabase;
  private supabase: SupabaseClient;

  private constructor() {
    const supabaseURL = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    if ((!supabaseURL || supabaseURL === '') || !supabaseKey) throw new Error('Supabase URL and Key must be set in environment variables')
    this.supabase = createClient(supabaseURL!, supabaseKey!)
  }

  public static getInstance(): SupabaseDatabase {
    if (!SupabaseDatabase.instance) {
      SupabaseDatabase.instance = new SupabaseDatabase();
    }

    return SupabaseDatabase.instance;
  }

  /*
    User Functions
  */

  getUserByAuthProviderId = async (authProviderId: string): Promise<User | undefined> => {
    const {data, error} = await this.supabase
      .from('user')
      .select('*')
      .eq('auth_provider_id', authProviderId)
      .single();
    if (error) throw error
    return data ?? undefined
  }

  getUserById = async (id: number): Promise<User | undefined> => {
    const {data, error} = await this.supabase
      .from('user')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error
    return data ?? undefined
  }

  createUser = async (user: Omit<User, 'id'>): Promise<User | undefined> => {
    const { firstName, lastName, authProviderId, email } = user;
    const {data, error} = await this.supabase
      .from('users')
      .insert([{ first_name: firstName, last_name: lastName, auth_provider_id: authProviderId, email }])
      .single();
    if (error) throw error
    return data;
  }

  /*
    KPI Functions
  */
  
  getDailyKPIsByUser = async (userId: number): Promise<DailyKPI[]> => {
    const { data, error } = await this.supabase.from('daily_kpi').select('name, id, data_type, goal').eq('user_id', userId)
    if (error) {
      if (!error.message) error.message = 'Failed to get rows from daily_kpi table for reasons unknown'
      throw error
    }
    const dailyKPIs = data.map(item => {
      return {
        name: item.name,
        dataType: item.data_type,
        definitionId: item.id,
        goal: item.goal
      } as DailyKPI
    })
    return dailyKPIs
  }

  getTodaysLatestKPIEntries = async (kpiIDs: string[], timezone: TIMEZONE): Promise<DailyKPI[]> => {
    const { data, error } = await this.supabase.rpc('get_todays_most_recent_kpi_entries', {
      kpi_ids: kpiIDs,
      timez: timezone     
    });
    if (error) {
      if (!error.message) error.message = 'Failed to gt todays latest kpi entries for reasons unknown'
      throw error
    }
    const latestKPIEntries = data.map((item: any) => {
      return {
        entryId: item.id,
        definitionId: item.daily_kpi_id,
        timestamp: item.entry_timestamp,
        current: item.value
      } as DailyKPI
    })
    return latestKPIEntries
  }

  getWeeksLatestDailyKPIEntries = async (kpiIDs: string[], timezone: TIMEZONE): Promise<DailyKPI[]> => {
    const { data, error } = await this.supabase.rpc('get_todays_most_recent_kpi_entries', {
      kpi_ids: kpiIDs,
      timez: timezone     
    });
    if (error) {
      if (!error.message) error.message = 'Failed to get this weeks latest daily kpi entries for reasons unknown'
      throw error
    }
    const weeksLatestDailyKPIEntries = data.map((item: any) => {
      return {
        entryId: item.id,
        definitionId: item.daily_kpi_id,
        timestamp: item.entry_timestamp,
        current: item.value
      } as DailyKPI
    }) 
    return weeksLatestDailyKPIEntries
  }

  upsertKPI = async (kpi: DailyKPI, action: string): Promise<DailyKPI> => {
    const { data, error } = await this.supabase
      .from('daily_kpi_entry')
      .upsert({
        id: kpi.entryId,
        daily_kpi_id: kpi.definitionId,
        value: kpi.current,
        action: action
      }, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      if (error) {
        if (!error.message) error.message = 'Failed to upsert daily KPI for reasons unknown'
        throw error
      }
      return kpi
  }
}