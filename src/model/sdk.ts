import { LotrMovieKey, LotrQuoteKey, LotrFilterType } from './enum';

interface LotrProResponse<T, D> {
  data: T | null;
  error: D | null;
}

interface LotrQueryOptions {
  pagination?: {
    limit?: number;
    page?: number;
    offset?: number;
  };
  sort?: {
    key: LotrMovieKey | LotrQuoteKey;
    type: 'asc' | 'desc';
  };
  filter?: {
    [LotrFilterType.match]?: { value: string; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.negateMatch]?: { value: string; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.include]?: { value: string[]; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.exclude]?: { value: string[]; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.exist]?: { key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.notExist]?: { key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.regex]?: { value: string; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.lt]?: { value: number; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.gt]?: { value: number; key: LotrMovieKey | LotrQuoteKey };
    [LotrFilterType.gte]?: { value: number; key: LotrMovieKey | LotrQuoteKey };
  };
}

export { LotrProResponse, LotrQueryOptions };
