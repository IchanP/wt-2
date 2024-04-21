import { NextFunction, Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import 'dotenv/config'
import { INVERSE_TYPES } from 'config/types.ts'
import { InvalidQueryError } from 'utils/Errors/InvalidQueryError.ts'
import createError from 'http-errors'
import { NotFoundError } from 'utils/Errors/NotFoundError.ts'

/**
 * Controller that handles requests related to fetching resources related to anime.
 */
@injectable()
export class AnimeController {
  @inject(INVERSE_TYPES.ISearchAnime) private service: ISearchAnime
  #number : number = 0

  /**
   * Verifies that the passed paramaters are valid and then searches for anime based on the title.
   *
   * @param {Request} req - The request object, should have a query of the type keyword and searchFields.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data.
   */
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

  /**
   * Fetches all the tags in the database.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data.
   */
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

  /**
   * Fetches aggregated data for a specific tag.
   *
   * @param {Request} req - The request object, should have a query of the type tagname.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data
   */
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

  /**
   * Fetches the number of anime produced per year within the specified range provided in the query.
   *
   * @param {Request} req - The request object, should have a query of the type earliest and latest in the format of YYYY.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data
   */
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

  /**
   * Fetches a singular anime by the id provided in the param.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data
   */
  async fetchAnimeById (req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      if (!id || isNaN(id)) {
        throw new InvalidQueryError('Id must be provided and be a number')
      }
      const data = await this.service.getAnimeById(id)
      return res.json({ data })
    } catch (e: unknown) {
      let err = e as Error
      console.error(err.message)
      if (err instanceof InvalidQueryError) {
        err = createError(400, err.message)
      } else if (err instanceof NotFoundError) {
        err = createError(404, err.message)
      }
      next(err)
    }
  }

  /**
   * Fetches the anime produced within the given genre and year range.
   *
   * @param {Request} req - The request object, should have the query paramaters earliest, latest and tags.
   * @param {Response} res - The response returned to the caller.
   * @param {NextFunction} next - The next function to call if an error occurs.
   * @returns {Promise<Response>} The response containing the data
   */
  async searchGenreByYear (req: Request, res: Response, next: NextFunction) {
    try {
      const { earliest, latest } = this.#parseEarleistAndLatest(req)
      const tag = req.query.tags as string
      if (!tag) {
        throw new InvalidQueryError('Tag must be provided')
      }
      const data = await this.service.searchGenreByYear(tag, { earliest, latest })
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

  /**
   * Verifies that the passed paramaters are valid numbers. Throws an error if they are not.
   *
   * @param {Request} req - The request object containing the paramaters.
   * @returns {{earliest: number, latest: number}} The parsed paramaters.
   */
  #parseEarleistAndLatest (req: Request) {
    const earliest = parseInt(req.query.earliest as string)
    const latest = parseInt(req.query.latest as string)
    if (isNaN(earliest) || isNaN(latest)) {
      throw new InvalidQueryError('Earliest and latest must be numbers')
    }
    if (earliest > latest) {
      throw new InvalidQueryError('Earliest must be less than latest')
    }
    return { earliest, latest }
  }
}
