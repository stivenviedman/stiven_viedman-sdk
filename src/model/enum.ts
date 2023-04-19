enum LotrMovieKey {
  name = 'name',
  runtimeInMinutes = 'runtimeInMinutes',
  budgetInMillions = 'budgetInMillions',
  boxOfficeRevenueInMillions = 'boxOfficeRevenueInMillions',
  academyAwardNominations = 'academyAwardNominations',
  academyAwardWins = 'academyAwardWins',
  rottenTomatoesScore = 'rottenTomatoesScore',
}

enum LotrQuoteKey {
  dialog = 'dialog',
  movie = 'movie',
  character = 'character',
}

enum LotrFilterType {
  match = 'match',
  negateMatch = 'negateMatch',
  include = 'include',
  exclude = 'exclude',
  exist = 'exist',
  notExist = 'notExist',
  regex = 'regex',
  lt = 'lt',
  gt = 'gt',
  gte = 'gte',
}

export { LotrMovieKey, LotrQuoteKey, LotrFilterType };
