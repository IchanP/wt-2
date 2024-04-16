// TODO make docs for endpoints
// TODO add return examples?
// TODO also add whether the endpoint requires authentication or not (they all do)

# Elastic + MongoDB Backend Service

As this backend is not meant to be exposed to the public currently there is no authentication or authorization implemented.

All URL examples will show localhost for that reason.

## Endpoint documentation

### /api/anime

#### /search

The search endpoint is used for keyword searching.

- Method ``GET``
- Query params:
  - ``keyword``: The keyword to search for // TODO maybe this should be an array as well?
  - ``searchFields``: The fields of the anime object to search for the keyword in.

##### Example URL

An example URL may look like this:

``http://localhost:{port}/api/anime/search?keyword=Oshi&searchFields=title+synonyms``

This will search for the keyword ``Oshi`` in the fields ``title`` and ``synonyms``.

Essentially this acts as a title search as the synonyms field are the alternative titles for the anime based on language or other factors.

#### /count

The count endpoint is used to get the total number of documents in the collection.

- Method ``GET``
- Query params:
  - None

##### Example URL

An example URL may look like this:

``http://localhost:{port}/api/anime/count``

#### /tag

The tag endpoint is used to fetch aggregated data about a tag based on year. This will return the number of anime that have that tag in the range specified in the query.

- Method ``GET``
- Query params:
  - ``tag``: The tag to search for.
  - ``earliest``: The start year of the range.
  - ``latest``: The end year of the range.

##### Example URL

An example URL may look like this:

``http://localhost:{port}/api/anime/tag?tag=Action&earliest=2010&latest=2020``

##### Considerations

The result may be empty if there are no anime that have the tag in the specified range. In this case, the return value will simply be an empty array and should be handled by the requester.

This will fetch the number of anime that have the tag ``Action`` in the range of 2010 to 2020 and return the count *for each year*.

#### /tags

The tags endpoint is used to fetch the name of all the tags in the collection.

- Method ``GET``
- Query params:
  - None

##### Example URL

An example URL may look like this:

``http://localhost:{port}/api/anime/tags``
