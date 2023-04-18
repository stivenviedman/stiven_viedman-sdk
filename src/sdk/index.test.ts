import { LotrProSdk } from './index';
import { mockAxiosGetReject, mockAxiosGetResolve, TaoData } from '../../testing';

describe('LotrProSdk', () => {
  const token = 'token-abc';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should create instance successfully', () => {
      expect(new LotrProSdk({ token })).toBeInstanceOf(LotrProSdk);
    });

    it('should throw error if no token is provided', () => {
      try {
        new LotrProSdk({ token: null } as any);
      } catch (error) {
        expect((error as Error).message).toBe('A token is required for using LOTR Pro SDK');
      }

      expect.assertions(1);
    });
  });

  describe('getMovies', () => {
    it('should return movies data if API call resolves', async () => {
      mockAxiosGetResolve(TaoData.movies);
      const response = await new LotrProSdk({ token }).getMovies();

      expect(response).toEqual({
        data: TaoData.movies,
        error: null,
      });
    });

    it('should return error if API call rejects', async () => {
      mockAxiosGetReject(TaoData.error);
      const response = await new LotrProSdk({ token }).getMovies();

      expect(response).toEqual({
        data: null,
        error: TaoData.error.response.data,
      });
    });
  });

  describe('getMovieById', () => {
    it('should return movie data if API call resolves', async () => {
      mockAxiosGetResolve(TaoData.movie);
      const response = await new LotrProSdk({ token }).getMovieById('id');

      expect(response).toEqual({
        data: TaoData.movie,
        error: null,
      });
    });

    it('should return error if API call rejects', async () => {
      mockAxiosGetReject(TaoData.error);
      const response = await new LotrProSdk({ token }).getMovieById('id');

      expect(response).toEqual({
        data: null,
        error: TaoData.error.response.data,
      });
    });
  });

  describe('getQuotesByMovieId', () => {
    it('should return quotes data if API call resolves', async () => {
      mockAxiosGetResolve(TaoData.quotes);
      const response = await new LotrProSdk({ token }).getQuotesByMovieId('id');

      expect(response).toEqual({
        data: TaoData.quotes,
        error: null,
      });
    });

    it('should return error if API call rejects', async () => {
      mockAxiosGetReject(TaoData.error);
      const response = await new LotrProSdk({ token }).getQuotesByMovieId('id');

      expect(response).toEqual({
        data: null,
        error: TaoData.error.response.data,
      });
    });
  });
});
