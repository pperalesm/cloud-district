const v1 = 'v1';

const playersRoot = 'players';
const coachesRoot = 'coaches';

export const routesV1 = {
  version: v1,
  players: {
    root: playersRoot,
    delete: `/${playersRoot}/:id`,
  },
  coaches: {
    root: coachesRoot,
    delete: `/${coachesRoot}/:id`,
  },
};
