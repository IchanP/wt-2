/**
 * Starting point of the app.
 *
 * @author Pontus Grandin
 */
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from 'routes/router.ts'
import 'dotenv/config'
import { container } from 'config/inversify.config.ts'
import { connectDB } from 'config/mongoose.ts'
import { INVERSE_TYPES } from 'config/types.ts'

try {
  const app = express()
  // Start DB and sync data to elastic
  await connectDB(process.env.MONGO_CONNECTION_STRING)
  container.get<DataSync>(INVERSE_TYPES.DataSync).startSync()

  app.set('container', container)
  // Boiler plate for security and logging
  app.use(helmet())
  app.use(express.json())
  app.use(logger('dev'))
  app.use('/', router)

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })

  // Error handling
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(function (err: ExtendedError, req: Request, res: Response, next: NextFunction) {
    err.status = err.status || 500
    if (err.status === 400) {
      err.message = err.message || 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'
    }
    // Catch for all errors that are not set
    if (err.status === 500) {
      err.message = 'An unexpected condition was encountered.'
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Development only!
    // Only providing detailed error in development.
    console.error(err.stack)
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        cause: err.cause
          ? {
              status: err.cause.status,
              message: err.cause.message,
              stack: err.cause.stack
            }
          : null,
        stack: err.stack
      })
  })
} catch (e: unknown) {
  console.error(e)
  process.exitCode = 1
}
