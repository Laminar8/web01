export interface WeatherResponse {
  response: {
    header: { resultCode: string; resultMsg: string }
    body: {
      dataType: string
      items: {
        item: Array<{ baseDate: string; baseTime: string; category: string; fcstDate: string; fcstTime: string; fcstValue: string; nx: number; ny: number }>
      }
      pageNo: number
      numOfRows: number
      totalCount: number
    }
  }
}
