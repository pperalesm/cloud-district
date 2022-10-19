export const routesV1 = {
  version: 'v1',
  players: {
    root: 'players',
  },
  coaches: {
    root: 'coaches',
  },
  clubs: {
    root: 'clubs',
    updateBudget: `:id/budget`,
  },
};
