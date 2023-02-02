import axios from 'axios'

export default () => {
  const axiosInstanceV3 = axios.create({
    baseURL: `https://www.googleapis.com/youtube/v3/`
  })

  return axiosInstanceV3
}
