export const kitsuBaseUrl = 'https://kitsu.io/api/edge/anime/'

export const aniListGraphQlUrl = 'https://graphql.anilist.co'

/**
 * Constructs the Jikan URL for fetching anime data.
 *
 * @param {string} malId - The MAL ID of the anime.
 * @returns {string} - The constructed Jikan URL.
 */
export function constructJikanUrl (malId: string) {
  return `https://api.jikan.moe/v4/anime/${malId}/full`
}
