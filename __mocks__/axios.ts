const axios = {
  create: jest.fn().mockReturnValue({
    get: jest.fn(),
  }),
};

export default axios;
