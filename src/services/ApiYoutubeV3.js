import axios from 'axios'

export default () => {
  const axiosInstanceV3 = axios.create({
    baseURL: `https://www.googleapis.com/youtube/v3/`
  })

  
  // axiosInstanceV3.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response.status === 401) {
  //       localStorage.removeItem('token')
  //       localStorage.removeItem('user')
  //       location.reload()
  //     }
  //     return Promise.reject(error)
  //   }
  // )

  return axiosInstanceV3
}
