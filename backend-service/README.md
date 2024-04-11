// TODO make docs for endpoints

# Elastic + MongoDB Backend Service

As this backend is not meant to be exposed to the public currently there is no authentication or authorization implemented.

All URL examples will show localhost for that reason.

## Endpoint documentation

### Search

The search endpoint is used for keyword searching.

- Method ``GET``
- Query params:
  - ``keyword``: The keywrod to search for // TODO maybe this should be an array as well?
  - ``searchFields``: The fields of the anime object to search for the keyword in.

### Example URL

An example URL may look like this:

``http://localhost:{port}/search?keyword=Oshi&searchFields=title+synonyms``

This will search for the keyword ``Oshi`` in the fields ``title`` and ``synonyms``.

Essentially this acts as a title search as the synonyms field are the alternative titles for the anime based on language or other factors.
