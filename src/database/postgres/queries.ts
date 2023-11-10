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
const GET_TODAYS_MOST_RECENT_DAILY_KPI_ENTRIES = (timezone: PostgreSQLTimezone, dailyKPIIDs: number[]) => `
  SELECT 
    MAX(timestamp AT TIME ZONE '${timezone}') AS timestamp,
    daily_kpi_id,
    MAX(action) AS action, 
    MAX(value) as value, 
    MAX(id) as id
  FROM daily_kpi_entry 
  WHERE Date(timestamp AT TIME ZONE '${timezone}') = Date(current_timestamp AT TIME ZONE '${timezone}')
    AND daily_kpi_id IN (${dailyKPIIDs.join(',')})
  GROUP BY daily_kpi_id; `

// Daily KPI Queries
const GET_USERS_DAILY_KPIS = (userId: number) => `
SELECT ${schema}.daily_kpi.name, id, data_type, goal FROM ${schema}.daily_kpi WHERE ${schema}.daily_kpi.user_id = ${userId};
`


export default {
  timeBlocks: {
    insertNewTimeBlock: INSERT_NEW_TIME_BLOCK
  },
  users: {
    findUserWithAuthProviderId: FIND_USER_WITH_AUTH_ID,
    createUser: CREATE_USER
  },
  dailyKPIEntry: {
    getTodaysMostRecentDailyKPIEntries: GET_TODAYS_MOST_RECENT_DAILY_KPI_ENTRIES
  },
  dailyKPI: {
    getUsersDailyKPIs: GET_USERS_DAILY_KPIS
  }
}