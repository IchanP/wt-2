import { NextFunction, Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { INVERSE_TYPES } from 'config/types.ts'
import { InvalidQueryError } from 'utils/Errors/InvalidQueryError.ts'
import createError from 'http-errors'

@injectable()
export class AnimeController {
  @inject(INVERSE_TYPES.ISearchAnime) private service: ISearchAnime
  #number : number = 0

  async searchAnimeTitle (req: Request, res: Response, next: NextFunction) {
    try {
      const title = req.query.keyword as string
      if (!title) {
        throw new InvalidQueryError('Title must be provided')
      }

      // TODO make the below check against the possible allowed fields essentially make an enum of the allowed fields
      const searchField: string = req.query.searchFields as string
      if (!searchField) {
        throw new InvalidQueryError('Search fields must be provided')
      }
      const searchFields = searchField.split(' ')

      const data = await this.service.searchAnime(title, searchFields)
      return res.json({ data })
    } catch (e: unknown) {
      let err = e as Error
      console.error(err.message)
      if (err instanceof InvalidQueryError) {
        err = createError(400, err.message)
      }
      next(err)
    }
  }

  async fetchTags (req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await this.service.nameAllTags()
      return res.json({ data: tags })
    } catch (e: unknown) {
      const err = e as Error
      console.error(err.message)
      next(err) // Will always end up being a 500 but as the end user can't affect this it's fine
    }
  }

  async fetchTagData (req: Request, res: Response, next: NextFunction) {
    try {
      // TODO make the below check a general function where you pass in the query name to retrieve the query value
      const tag = req.query.tagname as string
      if (!tag) {
        throw new InvalidQueryError('Tag name must be provided')
      }

      const { earliest, latest } = this.#parseEarleistAndLatest(req)
      const data = await this.service.countTagByYear(tag, { earliest, latest })
      return res.json({ data })
    } catch (e: unknown) {
      let err = e as Error
      console.error(err.message)
      if (err instanceof InvalidQueryError) {
        err = createError(400, err.message)
      }
      next(err)
    }
  }

  async fetchTotalByYear (req: Request, res:Response, next: NextFunction) {
    try {
      const { earliest, latest } = this.#parseEarleistAndLatest(req)
      const data = await this.service.countAnime({ earliest, latest })
      return res.json({ data })
    } catch (e: unknown) {
      let err = e as Error
      console.error(err.message)
      if (err instanceof InvalidQueryError) {
        err = createError(400, err.message)
      }
      next(err)
    }
  }

  #parseEarleistAndLatest (req: Request) {
    const earliest = parseInt(req.query.earliest as string)
    const latest = parseInt(req.query.latest as string)
    if (isNaN(earliest) || isNaN(latest)) {
      throw new Error('Earliest and latest must be numbers')
    }
    return { earliest, latest }
  }
}
