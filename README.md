## LOTR PRO SKD

LOTR PRO SDK - LPS - is a ready to use JS SDK with TS support built on top of [The One API](https://the-one-api.dev/).

LPS is meant to be simple, declarative and complete. It covers the endpoints

- `/movie`
- `/movie/{id}`
- `/movie/{id}/quote`

## Installation

LPS is available in the npm registry.

`npm install lotr-pro-sdk`

## Usage

### Basic usage

Import the LortProSdk class and provide a valid auth token, if you don't have one, you can get it [here](https://the-one-api.dev/sign-up)

```ts
import { LortProSdk } from "lort-pro-sdk";

// create an instance by providing a token
const lps = new LortProSdk({ token: '<your_token_goes_here>' });

// get all movies, also accepts a query options object
const movies = await lps.getMovies()

// get a specific movie by id
const movies = await lps.getMovie('<movie_id>')

// get the quotes of a movie by its id, also accepts a query options object
const movieQuotes = await lps.getQuotesByMovieId('<movie_id>')
```

### Return types

LPS follows a concise form for the return value of all methods.

```ts
import { LortProSdk } from "lort-pro-sdk";

const lps = new LortProSdk({ token: '<your_token_goes_here>' });

// either data or error will be null. See API section for detailed interfaces
const { data, error } = await lps.getMovies();

```

### Pagination, filtering, and sorting

Methods for querying several entities (getMovies and getQuotesByMovieId) receive an optional parameter of query options that follow the interface:

```ts
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
```

Don't worry about magic string or weird types - TPS's got you cover, everything you need is ready to use in the library.

```ts
import { LortProSdk, LotrMovieKey } from 'lotr';

const lps = new LortProSdk({ token: '<your_token_goes_here>' });

const { data, error } = await lps.getMovies({
    pagination: { limit: 5 },
    sort: { type: 'asc', key: LotrMovieKey.name },
    filter: {
      [SdkFilterType.match]: { key: LotrMovieKey.name, value: 'King' },
    },
});
```
