const idParam = 'id';
const playerIdParam = 'playerId';
const coachIdParam = 'coachId';

const v1 = 'v1';
const playersRoute = 'players';
const coachesRoute = 'coaches';
const clubsRoute = 'clubs';
const specificClubRoute = `:${idParam}`;
const clubPlayersRoute = `:${idParam}/players`;
const clubCoachesRoute = `:${idParam}/coaches`;
const specificClubPlayerRoute = `${clubPlayersRoute}/:${playerIdParam}`;
const specificClubCoachRoute = `${clubCoachesRoute}/:${playerIdParam}`;

export const routesV1 = {
  version: v1,
  players: {
    root: playersRoute,
  },
  coaches: {
    root: coachesRoute,
  },
  clubs: {
    root: clubsRoute,
    update: specificClubRoute,
    updateIdParam1: idParam,
    registerPlayer: clubPlayersRoute,
    registerPlayerIdParam1: idParam,
    registerCoach: clubCoachesRoute,
    registerCoachIdParam1: idParam,
    dropPlayer: specificClubPlayerRoute,
    dropPlayerIdParam1: idParam,
    dropPlayerIdParam2: playerIdParam,
    dropCoach: specificClubCoachRoute,
    dropCoachIdParam1: idParam,
    dropCoachIdParam2: coachIdParam,
    getPlayers: clubPlayersRoute,
    getPlayersIdParam1: idParam,
  },
};
