interface LotrProResponse<T, D> {
  data: T | null;
  error: D | null;
}

export { LotrProResponse };
