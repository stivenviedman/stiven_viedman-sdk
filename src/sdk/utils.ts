import { AxiosError } from 'axios';
import { ToaError } from '../model';

const getErrorObject = (error: AxiosError): ToaError => {
  const toaError = (error as AxiosError)?.response?.data as ToaError | undefined;
  return (
    toaError || {
      success: false,
      message: 'Something unknown happened',
    }
  );
};

export { getErrorObject };
