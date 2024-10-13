export interface DetailedPlan {
  region: string
  sequence: number
  latitude: number
  longitude: number
  scheduleDetailsId: number
  detailedPlanId: number
  memo: string | null
  memoId: number | null
}

export interface PlanData {
  scheduleDetailsId: number
  travelDate: string
  detailedPlans: DetailedPlan[]
}
