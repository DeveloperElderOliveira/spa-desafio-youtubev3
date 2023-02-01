import ApiYoutubeV3 from '@/services/ApiYoutubeV3'

export default {
  search(text) {
    return ApiYoutubeV3().get(`search?part=snippet&maxResults=20&regionCode=BR&key=AIzaSyBrv2XwNbYVOddM_O3tYh5ZgkXyEUfENK0&type=video&q=${text}`)
  }
}
