import { AxiosError } from 'axios';
import { getErrorObject } from './utils';

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
});
