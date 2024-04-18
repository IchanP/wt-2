# Endpoint documentation

As the API was designed around the idea of it being used as a backend standalone service on the same system as the front-end, the example URLs use localhost as the base URL.

## /api/anime

### /search

The search endpoint is used for keyword searching.

- Method ``GET``
- Query params:
  - ``keyword``: The keyword to search for // TODO maybe this should be an array as well?
  - ``searchFields``: The fields of the anime object to search for the keyword in.

#### Example /search URL

An example URL may look like this:

``http://localhost:{port}/api/anime/search?keyword=Oshi&searchFields=title+synonyms``

This will search for the keyword ``Oshi`` in the fields ``title`` and ``synonyms``.

Essentially this acts as a title search as the synonyms field are the alternative titles for the anime based on language or other factors.

#### Example /search Response

The API will return an array of Anime documents. See the [Anime Data Type](./datatypes.md#anime) for a comprehensive list of fields.

### /count

The count endpoint is used to get the total number of documents in the collection.

- Method ``GET``
- Query params:
  - None

#### Example /count URL

An example URL may look like this:

``http://localhost:{port}/api/anime/count``'

#### Example /count Response

The tag response will return aggregated data where the numbers of anime aired each year is mapped to eachother. For an example, see the [TagData Data Type](./datatypes.md#tagdata).

### /tag

The tag endpoint is used to fetch aggregated data about a tag based on year. This will return the number of anime that have that tag in the range specified in the query.

- Method ``GET``
- Query params:
  - ``tag``: The tag to search for.
  - ``earliest``: The start year of the range.
  - ``latest``: The end year of the range.

#### Example /tag URL

An example URL may look like this:

``http://localhost:{port}/api/anime/tag?tag=Action&earliest=2010&latest=2020``

#### Considerations

The result may be empty if there are no anime that have the tag in the specified range. In this case, the return value will simply be an empty array and should be handled by the requester.

This will fetch the number of anime that have the tag ``Action`` in the range of 2010 to 2020 and return the count *for each year*.

##### Example /tag Response

The tag response will return aggregated data where the numbers of occurences of the tag each year is mapped to eachother. For an example, see the [TagData Data Type](./datatypes.md#tagdata).

### /tags

The tags endpoint is used to fetch the name of all the tags in the collection.

- Method ``GET``
- Query params:
  - None

#### Example /tags URL

An example URL may look like this:

``http://localhost:{port}/api/anime/tags``

#### Example /tags Response

The API will return an array of strings. Each string is a tag that is present in the collection.

```json
[
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Magic",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Supernatural",
  "Thriller"
]
```

### /:id

The id endpoint is used to fetch a single anime document by its id. This endpoint returns a full and comprehensive document as it's stored in the database.

- Method ``GET``
- Query params:
  - None
- URL param:
  - ``id``: The id of the anime document to fetch.

#### Example /:id URL

An example URL may look like this:

``http://localhost:{port}/api/anime/18749``

This will fetch the anime document with the id ``18749``.

#### Example Response

The API will return a full Anime document. See the [Anime Data Type](./datatypes.md#anime) for a comprehensive list of fields.
