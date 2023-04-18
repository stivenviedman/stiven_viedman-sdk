interface ToaMovie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

interface ToaQuote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

interface ToaMoviesResponse {
  docs: ToaMovie[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

interface ToaSingleMovieResponse {
  docs: [ToaMovie];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

interface ToaError {
  success: boolean;
  message: string;
}

export { ToaMoviesResponse, ToaSingleMovieResponse, ToaError, ToaQuote, ToaMovie };
