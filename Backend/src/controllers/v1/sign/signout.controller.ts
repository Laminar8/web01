import axios from 'axios'

// Import Interfaces
import type express from 'express'

interface ServerData {
  today: string
}

export const get = (req: express.Request, res: express.Response): void => {
  req.session.destroy(() => {
    req.logout()
    void axios.request({ method: 'GET', url: 'http://localhost:4000/v1/time' }).then((response) => {
      const data = response.data as ServerData
      const today = data.today
      res.redirect(`http://localhost:5000/#/chat/${today}`)
    })
  })
}
