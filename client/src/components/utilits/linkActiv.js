export const linkActiv = active => {
  const baseS = { textDecoration: 'none' };
  if (active.isActive) {
    return { color: '#a7012a', ...baseS };
  }
  return { color: '#1818aa', ...baseS };
};
