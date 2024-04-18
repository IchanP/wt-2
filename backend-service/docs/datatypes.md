# Data Types

## Anime Type Definitions

The `Anime` data type represents a single anime document in the database. It contains information about the anime, such as its title, type, number of episodes, and more.

### Anime

| Field          | Datatype                 | Nullable | Description                                                  | Example                           |
|----------------|--------------------------|----------|--------------------------------------------------------------|-----------------------------------|
| `animeId`      | `number`                 | No       | Unique identifier for the anime.                             | `18749`                             |
| `title`        | `string`                 | No       | Title of the anime.                                          | "Monogatari Series: Second Season"                 |
| `type`         | `string`                 | No       | Type of the anime (e.g., TV, Movie).                         | "TV"                              |
| `sources`      | `string[]`               | No       | List of other sources which lists information about the anime.                | ["https://myanimelist.net/anime/17074", "https://anilist.co/anime/17074/Monogatari-Series-Second-Season/", ]        |
| `episodes`     | `number`                 | Yes      | Number of episodes the anime has.                            | `26`                              |
| `status`       | `string`                 | No       | Current status of the anime (e.g., Airing, Completed).       | "FINISHED"                          |
| `animeSeason`  | `object`                 | No       | Season and year the anime was released.                      | `{ season: "summer", year: 2013}` |
| `picture`      | `string`                 | No       | URL to a picture of the anime.                               | "<https://cdn.myanimelist.net/images/anime/1807/121534.jpg>"  |
| `thumbnail`    | `string`                 | No       | URL to a thumbnail image of the anime.                       | "<https://cdn.myanimelist.net/images/anime/1807/121534t.jpg>"    |
| `synonyms`     | `string[]`               | No       | List of alternative names or titles for the anime.           | ["Kabukimonogatari", "Kabukimonogatari: Mayoi Jianshi", "Koimonogatari", "Monogatari Second Season"]     |
| `relatedAnime` | `string[]`               | No       | List of IDs for anime related to this one.                   | ["https://anidb.net/anime/10891", "https://anime-planet.com/anime/bakemonogatari-recap", "https://livechart.me/anime/2791", "https://notify.moe/anime/KGTPpFmmg"]                    |
| `tags`         | `string[]`               | No       | List of tags associated with the anime.                      | ["female protagonist", "dissociative identities", "comedy", "achronological order"]             |
| `broadcast`    | `object`                 | Yes      | Scheduled broadcast time for the anime (if currently airing).| `{ day: "Sundays", time: "00:00",  timezone: "Asia/Tokyo", string: "Sundays at 00:00 (JST)" }` |

#### Example Anime JSON

```json
{
  "animeId": 18749,
  "title": "Monogatari Series: Second Season",
  "type": "TV",
  "sources": [
    "https://myanimelist.net/anime/17074",
    "https://anilist.co/anime/17074/Monogatari-Series-Second-Season/"
  ],
  "episodes": 26,
  "status": "FINISHED",
  "animeSeason": {
    "season": "summer",
    "year": 2013
  },
  "picture": "https://cdn.myanimelist.net/images/anime/1807/121534.jpg",
  "thumbnail": "https://cdn.myanimelist.net/images/anime/1807/121534t.jpg",
  "synonyms": [
    "Kabukimonogatari",
    "Kabukimonogatari: Mayoi Jianshi",
    "Koimonogatari",
    "Monogatari Second Season"
  ],
  "relatedAnime": [
    "https://anidb.net/anime/10891",
    "https://anime-planet.com/anime/bakemonogatari-recap",
    "https://livechart.me/anime/2791",
    "https://notify.moe/anime/KGTPpFmmg"
  ],
  "tags": [
    "female protagonist",
    "dissociative identities",
    "comedy",
    "achronological order"
  ],
  "broadcast": {
    "day": "Sundays",
    "time": "00:00",
    "timezone": "Asia/Tokyo",
    "string": "Sundays at 00:00 (JST)"
  }
}
```

## Tag and Bucket Data Type Definitions

These types define the structure used for handling aggregated data about tags over a specified range of years. Each tag will have associated data that encapsulates counts of documents (anime) for each year.

### TagData

| Field  | Datatype       | Nullable | Description                                               | Example                               |
|--------|----------------|----------|-----------------------------------------------------------|---------------------------------------|
| `tag`  | `string`       | No       | The name of the tag for which data is aggregated.         | "Action"                              |
| `data` | `BucketData[]` | No       | An array of `BucketData` objects, each representing a year and its document count. | See `BucketData` example below.       |

### BucketData

| Field       | Datatype | Nullable | Description                                            | Example          |
|-------------|----------|----------|--------------------------------------------------------|------------------|
| `key`       | `string` | No       | The year as a key for which the document count is aggregated. | "2020"           |
| `doc_count` | `number` | No       | The number of documents associated with the year.      | 150              |

#### Example TagData JSON

```json
{
  "tag": "Action",
  "data": [
    { "key": "2018", "doc_count": 120 },
    { "key": "2019", "doc_count": 130 },
    { "key": "2020", "doc_count": 150 }
  ]
}
```
