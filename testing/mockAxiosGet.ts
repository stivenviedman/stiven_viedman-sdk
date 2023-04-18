import axios from 'axios';

const mockAxiosGetResolve = (data: object) => {
  (axios as any).create.mockReturnValue({ get: () => Promise.resolve({ data }) });
};

const mockAxiosGetReject = (data: object) => {
  (axios as any).create.mockReturnValue({ get: () => Promise.reject(data) });
};

export { mockAxiosGetReject, mockAxiosGetResolve };
