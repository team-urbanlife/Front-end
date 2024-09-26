import axios from 'axios'
import Gathering from '../../components/GatheringHome/gatheringclass'
import { GatheringData } from '../../components/GatheringRegister/GatheringRegisterForm'
const BACKEND_URL = ''

export async function storeGathering(gatheringData: Gathering) {
  const response = await axios.post(BACKEND_URL + '/??.json', gatheringData)
  const id = response.data.name
  return id
}

export async function fetchGatherings() {
  const response = await axios.get(BACKEND_URL + '/??.json')

  const gatheringS = []

  for (const key in response.data) {
    const gatheringObj = {
      id: key,
      title: response.data[key].title,
      period: new Date(response.data[key].period),
      content: response.data[key].content,
    }
    gatheringS.push(gatheringObj)
  }

  return gatheringS
}

export function updateGathering(id: string, gatheringData: Gathering) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, gatheringData)
}

export function deleteGathering(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
