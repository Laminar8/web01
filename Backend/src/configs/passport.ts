// Module Import
import { Strategy as LocalStrategy } from 'passport-local'
import { Db, Collection } from 'mongodb'
// import passport from 'passport'
import type { Express } from 'express'

// Interface Import
import type { Users } from '../interfaces/v1/user.interfaces'
import passport from 'passport'

export const configurePassport = (app: Express, db: Db) => (passport: passport.PassportStatic): void => {
  app.use(passport.initialize())
  app.use(passport.session())

  const dbO: Db = db
  const collection: Collection<Users> = dbO.collection('user')

  /**
   * Local Strategy
   */
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
      collection.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          console.log('Incorrect email.')
          return done(null, false)
        }
        if (user.password != password) {
          console.log('Incorrect password.')
          return done(null, false)
        }
        console.log('Successful Signin.')
        return done(null, user)
      })
    })
  )

  /**
   * Serialize
   */
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  /**
   * Deserialize
   */

  passport.deserializeUser((user: Express.User, done) => {
    console.log(user)
    done(null, user)
  })
}
