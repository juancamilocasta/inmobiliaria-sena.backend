export const pageToOffset = (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return offset;
};
