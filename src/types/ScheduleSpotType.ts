export default interface ScheduleSpotType {
  id: number
  title: string
  hashtag: string[]
  imageUrl: string
  buttonName: string
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
  submit: boolean
}
