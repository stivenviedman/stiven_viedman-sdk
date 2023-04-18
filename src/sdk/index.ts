import axios, { AxiosError, AxiosInstance } from 'axios';
import { getErrorObject } from './utils';
import { LotrProResponse, ToaMoviesResponse, ToaError, ToaSingleMovieResponse, ToaQuote } from '../model';

class LotrProSdk {
  private readonly TheOneAPI: AxiosInstance;

  constructor({ token }: { token: string }) {
    if (!token) {
      throw new Error('A token is required for using LOTR Pro SDK');
    }

    this.TheOneAPI = axios.create({
      baseURL: 'https://the-one-api.dev/v2',
      timeout: 1000,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public async getMovies(): Promise<LotrProResponse<ToaMoviesResponse, ToaError>> {
    try {
      const { data } = await this.TheOneAPI.get<ToaMoviesResponse>('/movie');

      return { data, error: null };
    } catch (error) {
      return { data: null, error: getErrorObject(error as AxiosError) };
    }
  }

  public async getMovieById(id: string): Promise<LotrProResponse<ToaSingleMovieResponse, ToaError>> {
    try {
      const { data } = await this.TheOneAPI.get<ToaSingleMovieResponse>(`/movie/${id}`);

      return { data, error: null };
    } catch (error) {
      return { data: null, error: getErrorObject(error as AxiosError) };
    }
  }

  public async getQuotesByMovieId(id: string): Promise<LotrProResponse<ToaQuote, ToaError>> {
    try {
      const { data } = await this.TheOneAPI.get<ToaQuote>(`/movie/${id}/quote`);

      return { data, error: null };
    } catch (error) {
      return { data: null, error: getErrorObject(error as AxiosError) };
    }
  }
}

export { LotrProSdk };
