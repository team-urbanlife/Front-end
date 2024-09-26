export interface DetailedPlan {
  region: string
  sequence: number
  latitude: number
  longitude: number
  scheduleDetailsId: number
  memo: string | null
  memoId: number | null
}

export interface PlanData {
  id: number
  travelDate: string
  detailedPlans: DetailedPlan[]
}
