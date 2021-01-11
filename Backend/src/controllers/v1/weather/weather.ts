import axios, { AxiosResponse } from 'axios'
import { Today } from './time'
import type { WeatherResponse } from '../../../interfaces/v1/weather.interfaces'
import dotenv from 'dotenv'

// Module Initialize
dotenv.config()

export const Weather = async function (): Promise<[string, string | undefined, string | undefined] | undefined> {
  try {
    // KEY CHECK
    if (!process.env.WEATHER_API_KEY) {
      throw `KEY IS NOT ACTIVATED`
    }

    // CALL AN API
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'
    const [base_date, base_time] = Today()
    const params = {
      serviceKey: decodeURIComponent(process.env.WEATHER_API_KEY),
      pageNo: '1',
      numOfRows: '10',
      dataType: 'JSON',
      base_date: base_date,
      base_time: base_time,
      nx: '58',
      ny: '125',
    }
    const res: AxiosResponse = await axios.request({ method: 'GET', url: url, params: params })
    const tempData = <WeatherResponse>await res.data

    // Initialize
    let pty = ''
    let sky = ''
    let t3h = ''

    // Find Type
    for (const arr of tempData.response.body.items.item) {
      switch (arr.category) {
        case 'PTY':
          pty = arr.fcstValue
          break
        case 'SKY':
          sky = arr.fcstValue
          break
        case 'T3H':
          t3h = arr.fcstValue
          break
      }
    }

    // Error Throw
    if (pty === '' || sky === '' || t3h === '') {
      throw 'Weather API is not correctly working :('
    }

    // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
    // 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
    // 3시간 기온(T3H) 코드
    return [pty, sky, t3h]
  } catch (err) {
    console.error(err)
  }
}
