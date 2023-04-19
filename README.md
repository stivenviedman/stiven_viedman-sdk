# LOTR PRO SKD

## Description

LOTR PRO SDK - LPS - is a ready to use JS SDK with TS support built on top of [The One API](https://the-one-api.dev/).

LPS is meant to be simple and declarative and complete. So far we cover the endpoint

- /movie
- /movie/{id}
- /movie/{id}/quote

## Installation

## Usage

### Basic usage

Import the LortProSdk class and provide a valid auth token, if you don't have one, you can get it [here](https://the-one-api.dev/sign-up)

```ts
import { LortProSdk } from "lort-pro-sdk";

// create an instance by providing a token
const lps = new LortProSdk({ token: '<your_token_goes_here>' });

// get all movies
const movies = await lps.getMovies()

// get a specific movie by id
const movies = await lps.getMovie('<movie_id>')

// get the quotes of a movie by its id
const movieQuotes = await lps.getQuotesByMovieId('<movie_id>')
```

### Return types

LTS provides a standard form in the response of all methods.

```ts
import { LortProSdk } from "lort-pro-sdk";

/**
 * either data or error will be null
 * and the other one will be an object containing the information you're interested in
 * see API section for detailed interfaces
 */
const lps = new LortProSdk({ token: '<your_token_goes_here>' });

const { data, error } = await lps.getMovies();

```

### Pagination, filtering, and sorting

Methods for querying several entities (getMovies and getQuotesByMovieId) receive a parameter of query options that follow the interface:

```ts
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
```

All of them are optional and you can use it as needed.

Don't worry about magic string or weird types - TPS's got you cover, everything you need is ready to use in the library.

```ts
import { LortProSdk, LotrQueryOption, SdkMovieFilterKey, SdkQuoteKey } from 'lotr';

const lps = new LortProSdk({ token: '<your_token_goes_here>' });

const { data, error } = await lps.getMovies({
    pagination: { limit: 5 },
    sort: { type: 'asc', key: SdkMovieFilterKey.name },
    filter: {
      [SdkFilterType.match]: { key: SdkMovieFilterKey.name, value: 'King' },
    },
});
```
