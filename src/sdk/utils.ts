import { AxiosError } from 'axios';
import { ToaError, LotrQueryOptions, LotrFilterType } from '../model';

const getErrorObject = (error: AxiosError): ToaError => {
  const toaError = (error as AxiosError)?.response?.data as ToaError | undefined;
  return (
    toaError || {
      success: false,
      message: 'Something unknown happened',
    }
  );
};

const parseOptions = (options?: LotrQueryOptions): string => {
  let parsedOptions = '';
  const { pagination, sort, filter } = options || {};

  if (pagination) {
    for (const key in pagination) {
      if (Object.prototype.hasOwnProperty.call(pagination, key)) {
        parsedOptions = `${parsedOptions}${key}=${pagination[key as 'limit' | 'page' | 'offset']}&`;
      }
    }

    parsedOptions = parsedOptions.length ? `${parsedOptions}`.slice(0, parsedOptions.length - 1) : parsedOptions;
  }

  if (sort?.type && sort?.key) {
    parsedOptions = concatElement(parsedOptions, `sort=${sort.key}:${sort.type}`);
  }

  if (filter) {
    for (const filterType in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, filterType)) {
        const { key, value } = filter[filterType as LotrFilterType] as {
          key: string;
          value: string | number | string[];
        };

        switch (filterType) {
          case LotrFilterType.lt:
            parsedOptions = concatElement(parsedOptions, `${key}<${value}`);
            break;
          case LotrFilterType.gt:
            parsedOptions = concatElement(parsedOptions, `${key}>${value}`);
            break;
          case LotrFilterType.gte:
            parsedOptions = concatElement(parsedOptions, `${key}>=${value}`);
            break;
          case LotrFilterType.match:
            parsedOptions = concatElement(parsedOptions, `${key}=${value}`);
            break;
          case LotrFilterType.negateMatch:
            parsedOptions = concatElement(parsedOptions, `${key}!=${value}`);
            break;
          case LotrFilterType.include:
            parsedOptions = concatElement(parsedOptions, `${key}=${(value as string[]).join()}`);
            break;
          case LotrFilterType.exclude:
            parsedOptions = concatElement(parsedOptions, `${key}!=${(value as string[]).join()}`);
            break;
          case LotrFilterType.notExist:
            parsedOptions = concatElement(parsedOptions, `${parsedOptions}&!${key}`);
            break;
          case LotrFilterType.exist:
            parsedOptions = concatElement(parsedOptions, key);
            break;
          case LotrFilterType.regex:
            parsedOptions = concatElement(parsedOptions, `${key}=${value}`);
            break;
          default:
            break;
        }
      }
    }
  }

  return parsedOptions.length ? `?${parsedOptions}` : parsedOptions;
};

const concatElement = (parsedOptions: string, newValue: string): string =>
  `${parsedOptions}${parsedOptions.length ? '&' : ''}${newValue}`;

export { getErrorObject, parseOptions };
