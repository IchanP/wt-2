type UnknowableObject = { [key: string]: string | number }
type StateFunction<T> = (a: T[]) => void
type TagOptions = {
    selected: string[];
    color: string[];
}
type BucketData = { key: string, doc_count: number }
type TagData = { tag: string, data: BucketData[] }
type Span = { lowest: number, highest: number}
type MappedTag = { tag: string, color: string }
type AnimeType = 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL' | 'UNKNOWNN'

interface IAnime {
    animeId: number;
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
    broadcast?: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
}

