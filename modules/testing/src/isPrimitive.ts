export const isPrimitive = (value: unknown): boolean => {

  const itsType = typeof value;

  return (itsType === 'number' || itsType === 'string' || itsType === 'boolean');

};
