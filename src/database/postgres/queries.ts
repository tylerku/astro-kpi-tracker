import { TIMEZONE, DailyKPI } from '@/models';
import { PostgreSQLTimezone } from './types'

const schema = 'public';

// Time Blocks Queries
const INSERT_NEW_TIME_BLOCK = (userId: number) => `INSERT INTO time_block (start, user_id) VALUES (CURRENT_TIMESTAMP, ${userId});`

// Users Queries
const FIND_USER_WITH_AUTH_ID = (authProviderId: string) => `SELECT * FROM ${schema}.user WHERE auth_provider_id = '${authProviderId}';`
const CREATE_USER = (firstName: string, lastName: string, authProviderId: string, email: string) => `
INSERT INTO ${schema}.user (first_name, last_name, auth_provider_id, email) 
VALUES ('${firstName}', '${lastName}', '${authProviderId}', '${email}') 
RETURNING first_name, last_name, auth_provider_id, email, id;`

// Daily KPI Entry Queries
const GET_TODAYS_MOST_RECENT_DAILY_KPI_ENTRIES = (timezone: TIMEZONE, KPIIDs: string[]) => {
  const pgtz = PostgreSQLTimezone[timezone] 
  return `
    SELECT 
      MAX(timestamp AT TIME ZONE '${pgtz}') AS timestamp,
      daily_kpi_id,
      MAX(action) AS action, 
      MAX(value) as value, 
      MAX(id) as id
    FROM daily_kpi_entry 
    WHERE Date(timestamp AT TIME ZONE '${pgtz}') = Date(current_timestamp AT TIME ZONE '${pgtz}')
      AND daily_kpi_id IN (${KPIIDs.join(',')})
    GROUP BY daily_kpi_id; 
  `
}
const INSERT_DAILY_KPI_ENTRY = (kpi: DailyKPI) => {
  return `
    INSERT INTO daily_kpi_entry (daily_kpi_id, action, value, timestamp) 
    VALUES (${kpi.definitionId}, 'increment', ${kpi.current}, '${kpi.timestamp}') 
    RETURNING *;
  `
}

// Daily KPI Queries
const GET_USERS_DAILY_KPIS = (userId: number) => `
  SELECT ${schema}.daily_kpi.name, id, data_type, goal FROM ${schema}.daily_kpi WHERE ${schema}.daily_kpi.user_id = ${userId};`
const GET_USERS_WEEKLY_KPIS_PER_DAY = (timezone: TIMEZONE, KPIIDs: number[]) => {
  const pgtz = PostgreSQLTimezone[timezone]
  return `
  SELECT
    MAX(id) AS id,
    daily_kpi_id,
    MAX(timestamp) as timestamp,
    DATE_TRUNC('day', timestamp AT TIME ZONE '${pgtz}') AS day,
    MAX(value) AS value
  FROM
    daily_kpi_entry
  WHERE
    EXTRACT('year' FROM timestamp AT TIME ZONE '${pgtz}') = EXTRACT('year' FROM CURRENT_DATE AT TIME ZONE '${pgtz}')
    AND EXTRACT('week' FROM timestamp AT TIME ZONE '${pgtz}') = EXTRACT('week' FROM CURRENT_DATE AT TIME ZONE '${pgtz}')
    AND daily_kpi_id IN (${KPIIDs.join(',')})
  GROUP BY
    daily_kpi_id,
    day
  ORDER BY
    daily_kpi_id,
    day;
  `
}


export default {
  timeBlocks: {
    insertNewTimeBlock: INSERT_NEW_TIME_BLOCK
  },
  users: {
    findUserWithAuthProviderId: FIND_USER_WITH_AUTH_ID,
    createUser: CREATE_USER
  },
  dailyKPIEntry: {
    getTodaysMostRecentDailyKPIEntries: GET_TODAYS_MOST_RECENT_DAILY_KPI_ENTRIES,
    getUsersWeeklyKPIs: GET_USERS_WEEKLY_KPIS_PER_DAY,
    insertDailyKPIEntry: INSERT_DAILY_KPI_ENTRY
  },
  dailyKPI: {
    getUsersDailyKPIs: GET_USERS_DAILY_KPIS
  }
}