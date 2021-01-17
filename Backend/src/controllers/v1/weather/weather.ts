import axios, { AxiosResponse } from 'axios'
import { Today } from './time'
import type { WeatherResponse, Items } from '../../../interfaces/v1/weather.interfaces'
import dotenv from 'dotenv'

// Module Initialize
dotenv.config()

const getTime = (items: Items['item'], type: string, next_date: string) => {
  for (const arr of items) {
    if (arr.fcstDate === next_date) {
      if (arr.category === type) {
        return arr.fcstTime
      }
    }
  }
}

export const Weather = async function (): Promise<[[string, string, string], [string, string, string]] | undefined> {
  try {
    // KEY CHECK
    if (!process.env.WEATHER_API_KEY) {
      throw `KEY IS NOT ACTIVATED`
    }

    // CALL AN API
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'
    const [base_date, base_time, next_date] = Today()
    const params = {
      serviceKey: decodeURIComponent(process.env.WEATHER_API_KEY),
      pageNo: '1',
      numOfRows: '200',
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
    let tmn = ''
    let tmx = ''
    const nextDateWeather = []
    const tmnFcstTime = getTime(tempData.response.body.items.item, 'TMN', next_date)
    const tmxFcstTime = getTime(tempData.response.body.items.item, 'TMX', next_date)

    // Find Type
    for (const arr of tempData.response.body.items.item) {
      if (arr.fcstDate === next_date && arr.fcstTime === tmnFcstTime) {
        switch (arr.category) {
          case 'PTY':
            pty = arr.fcstValue
            break
          case 'SKY':
            sky = arr.fcstValue
            break
          case 'TMN':
            tmn = arr.fcstValue
        }
        if (tmn != '') {
          nextDateWeather.push([pty, sky, tmn])
          tmn = ''
        }
      } else if (arr.fcstDate === next_date && arr.fcstTime === tmxFcstTime) {
        switch (arr.category) {
          case 'PTY':
            pty = arr.fcstValue
            break
          case 'SKY':
            sky = arr.fcstValue
            break
          case 'TMX':
            tmx = arr.fcstValue
        }
        if (tmx != '') {
          nextDateWeather.push([pty, sky, tmx])
          tmx = ''
        }
      }
    }
    console.log(nextDateWeather)
    // Error Throw
    if (nextDateWeather.length < 2) {
      throw 'Weather API is not correctly working. Length of nextDateWeather is less than 2. :('
    } else if (nextDateWeather[0].length < 3 && nextDateWeather[1].length < 3) {
      throw 'Weather API is not correctly working. Length of element of nextDateWeather is less than 3. :('
    }

    // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
    // 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
    // 최저기온 기온(TMN) 코드
    // 최고기온 기온(TMX) 코드
    return <[[string, string, string], [string, string, string]]>nextDateWeather
  } catch (err) {
    console.error(err)
  }
}
