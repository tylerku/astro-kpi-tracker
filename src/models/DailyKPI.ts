export type DailyKPI = {
  entryId?: string 
  definitionId?: string
  timestamp: string
  dataType: string
  name: string
  goal: number
  current: number
}