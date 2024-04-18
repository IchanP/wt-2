type UnknowableObject = { [key: string]: string | number }
type StateFunction<T> = (a: T[]) => void
type TagOptions = {
    selected: string[];
    color: string[];
}
type BucketData = { key: string, doc_count: number }
type TagData = { tag: string, data: BucketData[] }
type Span = { lowest: number, highest: number}
type MappedTag = { name: string, color: string }
type AnimeType = 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL' | 'UNKNOWNN'

interface IAnime {
    animeId: number;
    sources: string[];
    title: string;
    type: AnimeType;
    episodes?: number;
    status: string;
    animeSeason: {
        season: string;
        year?: number;
    };
    synonyms: string[];
    relatedAnime: string[];
    tags: string[];
    picture: string;
    thumbnail: string;
    broadcast?: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
}

type Studio = {
    name: string;
    url: string | undefined;
}

interface KitsuAnimeData {
    attributes: {
        synopsis: string;
    }
}

interface ExternalAnime {
    synopsis: string;
    studios: Studio[];
    duration: string;
}

interface CombinedIAnimeData {
    anime: IAnime;
    externalData: ExternalAnime | null;
}
