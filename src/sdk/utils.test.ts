import { AxiosError } from 'axios';
import { getErrorObject, parseOptions } from './utils';
import { LotrMovieKey, LotrFilterType } from '../model';

describe('SDK utils', () => {
  describe('getErrorObject', () => {
    it('should return data response object if any', () => {
      const error = {
        response: {
          data: {
            success: false,
            message: 'Error from API',
          },
        },
      } as AxiosError;

      expect(getErrorObject(error)).toEqual(error.response?.data);
    });

    it('should return default data if no response data', () => {
      const error = {} as AxiosError;

      const defaultError = {
        success: false,
        message: 'Something unknown happened',
      };

      expect(getErrorObject(error)).toEqual(defaultError);
    });
  });

  describe('parseOptions', () => {
    it('should return empty string for non data cases', () => {
      expect(parseOptions()).toBe('');

      expect(parseOptions({})).toBe('');
    });

    it('should parse pagination options correctly', async () => {
      expect(
        parseOptions({
          pagination: { limit: 10 },
        }),
      ).toBe('?limit=10');

      expect(
        parseOptions({
          pagination: { limit: 10, page: 2 },
        }),
      ).toBe('?limit=10&page=2');

      expect(
        parseOptions({
          pagination: { limit: 10, page: 2, offset: 5 },
        }),
      ).toBe('?limit=10&page=2&offset=5');
    });

    it('should parse sort params correctly', () => {
      expect(
        parseOptions({
          sort: { type: 'asc', key: LotrMovieKey.name },
        }),
      ).toBe('?sort=name:asc');
    });

    it('should parse pagination and sort params correctly', () => {
      expect(
        parseOptions({
          pagination: { limit: 10, page: 2, offset: 5 },
          sort: { type: 'asc', key: LotrMovieKey.name },
        }),
      ).toBe('?limit=10&page=2&offset=5&sort=name:asc');
    });

    it('should parse filter params correctly', () => {
      expect(
        parseOptions({
          filter: {
            [LotrFilterType.match]: { key: LotrMovieKey.name, value: 'King' },
            [LotrFilterType.gt]: { key: LotrMovieKey.budgetInMillions, value: 30 },
          },
        }),
      ).toBe('?name=King&budgetInMillions>30');
    });

    it('should parse pagination, sort, and filter params correctly', () => {
      expect(
        parseOptions({
          pagination: { limit: 10, page: 2, offset: 5 },
          sort: { type: 'asc', key: LotrMovieKey.name },
          filter: {
            [LotrFilterType.match]: { key: LotrMovieKey.name, value: 'King' },
            [LotrFilterType.gt]: { key: LotrMovieKey.budgetInMillions, value: 30 },
          },
        }),
      ).toBe('?limit=10&page=2&offset=5&sort=name:asc&name=King&budgetInMillions>30');
    });
  });
});
