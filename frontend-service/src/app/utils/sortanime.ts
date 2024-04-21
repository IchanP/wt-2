/**
 * Sorts the anime by keyword. If the title of the anime starts with the keyword it will be sorted first.
 * If the first word only starts with the keyword it will be sorted second.
 *
 * @example
 * // returns [{title: 'oshi no ko},{title: 'oshi no ko season 2} , {title: 'oshiete hokusai}]
 * sortAnimeByKeyword('oshi', [{title: 'oshi no ko'},{title: 'oshi no ko season 2} , {title: 'oshiete hokusai'}])
 * @param {string} keyword - The keyword to sort by.
 * @param {IAnime[]} anime - The unsorted array to sort.
 * @returns {IAnime[]} - A sorted array.
 */
export function sortAnimeByKeyword (keyword: string, anime: IAnime[]): IAnime[] {
  const startsWithKeywordArray = [] as IAnime[]
  const otherAnime = [] as IAnime[]
  const exactMatch = [] as IAnime[]

  groupAnimeByMatch(anime, startsWithKeywordArray, exactMatch, otherAnime, keyword)
  sortTitlesWithTrailingSpacesFirst(startsWithKeywordArray, keyword)
  return [...exactMatch, ...startsWithKeywordArray, ...otherAnime]
}

/**
 * Groups anime where the title of the anime matches the provided keyword.
 *
 * @param {IAnime} allAnime - The ungrouped anime to group.
 * @param {IAnime[]} matchingAnime - Anime where the title starts with the keyword.
 * @param {IAnime[]} exactMatch - Anime where the title is an exact match to the keyword.
 * @param {IAnime[]} otherAnime - Anime that contain the keyword in the title.
 * @param {string} keyword - The keyword to sort by.
 */
function groupAnimeByMatch (allAnime: IAnime[], matchingAnime: IAnime[], exactMatch: IAnime[], otherAnime: IAnime[], keyword: string) {
  const keywordLowered = keyword.toLowerCase()

  for (const unsortedAnime of allAnime) {
    const lowercaseTitle = unsortedAnime.title.toLowerCase()
    const firstIndex = findFirstAlphaNumericalIndex(lowercaseTitle)

    if (isExactTitleMatch(lowercaseTitle, keywordLowered)) {
      exactMatch.push(unsortedAnime)
    } else if (isTitleStartWithKeyword(lowercaseTitle, keywordLowered, firstIndex)) {
      matchingAnime.push(unsortedAnime)
    } else {
      otherAnime.push(unsortedAnime)
    }
  }
}

/**
 * Checks if the title is an exact match to the search term.
 *
 * @param {string} title - The title to check if it is an exact match.
 * @param {string} searchTerm - The search term to check if it is an exact match.
 * @returns {boolean} - Returns true if the title is an exact match to the search term, false otherwise.
 */
function isExactTitleMatch (title: string, searchTerm: string): boolean {
  return title.toLowerCase() === searchTerm.toLowerCase()
}

/**
 * Checks if the title starts with the keyword.
 *
 * @param {string} title - The title to check if it starts with the keyword.
 * @param {string} keyword - The keyword to check if the title starts with.
 * @param {number} startPoint - The index from which to start checking if the title starts with the keyword.
 * @returns {boolean} - Returns true if the title starts with the keyword, false otherwise.
 */
function isTitleStartWithKeyword (title: string, keyword: string, startPoint: number): boolean {
  return title.startsWith(keyword, startPoint)
}

/**
 * Sorts the array so that titles with a trailing space after the keyword are sorted first.
 *
 * @param {IAnime[]} unsortedTrailingAnime - The unsorted array of anime with titles potentially containing trailing spaces after a keyword.
 * @param {string} keyword - The keyword to sort by.
 */
function sortTitlesWithTrailingSpacesFirst (unsortedTrailingAnime: IAnime[], keyword: string): void {
  unsortedTrailingAnime.sort((a, b) => {
    const titleA = a.title.toLowerCase()
    const titleB = b.title.toLowerCase()
    const indexA = titleA.indexOf(keyword)
    const indexB = titleB.indexOf(keyword)

    const hasSpaceA = indexA !== -1 && titleA[indexA + keyword.length] === ' '
    const hasSpaceB = indexB !== -1 && titleB[indexB + keyword.length] === ' '

    if (hasSpaceA && !hasSpaceB) {
      return -1
    }
    if (!hasSpaceA && hasSpaceB) {
      return 1
    }
    return 0
  })
}

/**
 * Finds the first index of an alphanumeric character in a string.
 *
 * @param {string} title - The title to search for the first alphanumeric character.
 * @returns {number} - The index of the first alphanumeric character.
 */
function findFirstAlphaNumericalIndex (title: string): number {
  return title.match(/[\w]/)?.index as number
}
