export const formatColumnName = (columnName: string) => {
  const split = columnName.split('_');
  return split.length > 1 ? split[0] : columnName;
};
