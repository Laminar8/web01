import moment from 'moment'
import type { WeekReturn } from '../../../interfaces/v1/week.interfaces'

export const Week = (weekNumber: string): WeekReturn => {
  // Initialize variable
  const weekArr = []
  const changeDayArr = []
  let thisWeek
  //  moment().day() -> 0(Sun), 1(Mon), 2(Tues), 3(Weds), 4(Thur), 5(Fri), 6(Sat)
  const todayOfDay = moment().day()
  const startOfDay = moment()
    .add(Number(weekNumber) * 7, 'days')
    .startOf('month')
    .format('YYYYMMDD')
  const endOfDay = moment()
    .add(Number(weekNumber) * 7, 'days')
    .endOf('month')
    .format('YYYYMMDD')
  //  Case
  switch (todayOfDay) {
    case 0:
      for (let i = -6; i++; i <= 0) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 1:
      for (let i = -5; i++; i <= 1) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 2:
      for (let i = -4; i++; i <= 2) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 3:
      for (let i = -3; i++; i <= 3) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 4:
      for (let i = -2; i++; i <= 4) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 5:
      for (let i = -1; i++; i <= 5) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
    case 6:
      for (let i = -0; i++; i <= 6) {
        thisWeek = Number(weekNumber) * 7 + i
        weekArr.push(moment().add(thisWeek, 'days').format('YYYYMMDD'))
      }
      break
  }
  console.log(weekArr)
  if (weekArr.length === 0) {
    throw 'weekArr length looks empty. Check Again. '
  }

  for (const i of weekArr) {
    if (i == endOfDay) {
      changeDayArr.push(1)
    } else if (i == startOfDay) {
      changeDayArr.push(2)
    } else {
      changeDayArr.push(0)
    }
  }
  console.log(changeDayArr)
  return { weekArr: weekArr, changeDayArr: changeDayArr }
}
