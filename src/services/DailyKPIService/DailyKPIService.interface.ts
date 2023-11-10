export interface KPIService {
  getThisWeeksKPIs: () => Promise<void>
  getTodaysKPIs: () => Promise<void>
}