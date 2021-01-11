import moment from 'moment'

export const Today = (): [string, string] => {
  let base_date, base_time
  const time = Number(moment().format('HHmm'))
  if (time > 211 && time <= 510) {
    base_date = moment().format('YYYYMMDD')
    base_time = '0200'
  } else if (time > 511 && time <= 810) {
    base_date = moment().format('YYYYMMDD')
    base_time = '0500'
  } else if (time > 811 && time <= 1110) {
    base_date = moment().format('YYYYMMDD')
    base_time = '0800'
  } else if (time > 1111 && time <= 1410) {
    base_date = moment().format('YYYYMMDD')
    base_time = '1100'
  } else if (time > 1411 && time <= 1710) {
    base_date = moment().format('YYYYMMDD')
    base_time = '1400'
  } else if (time > 1711 && time <= 2010) {
    base_date = moment().format('YYYYMMDD')
    base_time = '1700'
  } else if (time > 2011 && time <= 2310) {
    base_date = moment().format('YYYYMMDD')
    base_time = '2000'
  } else {
    base_date = moment().subtract(1, 'day').format('YYYYMMDD')
    base_time = '2300'
  }
  console.log()
  console.log(`Search for my Local Time @[${moment().format('HH:mm')}] ♥`)
  console.log()
  return [base_date, base_time]
}
