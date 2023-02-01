import ApiYoutubeV3 from '@/services/ApiYoutubeV3'

export default {
  getAll() {
    return ApiYoutubeV3().get(`videos?chart=mostPopular&part=snippet&maxResults=20&regionCode=BR&key=AIzaSyBrv2XwNbYVOddM_O3tYh5ZgkXyEUfENK0`)
  },
  // getById(id) {
  //   return Api().get(`videos/${id}`)
  // },
  // uploadVideo(data, optional) {
  //   return Api().post('videos', data, optional)
  // },
  // updateVideo(id, data) {
  //   return Api().put(`videos/${id}`, data)
  // },
  // updateViews(id) {
  //   return Api().put(`videos/${id}/views`)
  // },
  // uploadThumbnail(id, data) {
  //   return Api().put(`videos/${id}/thumbnails`, data)
  // },
  // deleteById(id) {
  //   return Api().delete(`videos/${id}`)
  // }
}
