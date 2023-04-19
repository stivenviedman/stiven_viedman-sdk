import { SdkMovieFilterKey, SdkQuoteKey, SdkFilterType } from './enum';

interface LotrProResponse<T, D> {
  data: T | null;
  error: D | null;
}

interface LotrQueryOption {
  pagination?: {
    limit?: number;
    page?: number;
    offset?: number;
  };
  sort?: {
    key: SdkMovieFilterKey | SdkQuoteKey;
    type: 'asc' | 'desc';
  };
  filter?: {
    [SdkFilterType.match]?: { value: string; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.negateMatch]?: { value: string; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.include]?: { value: string[]; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.exclude]?: { value: string[]; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.exist]?: { key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.notExist]?: { key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.regex]?: { value: string; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.lt]?: { value: number; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.gt]?: { value: number; key: SdkMovieFilterKey | SdkQuoteKey };
    [SdkFilterType.gte]?: { value: number; key: SdkMovieFilterKey | SdkQuoteKey };
  };
}

export { LotrProResponse, LotrQueryOption };
