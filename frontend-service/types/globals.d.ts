type UnknowableObject = { [key: string]: string | number }
type StateFunction<T> = (a: T[]) => void
type TagOptions = {
    selected: string[];
    color: string[];
}
type BucketData = { key: string, doc_count: number }
type TagData = { tag: string, data: BucketData[] }
