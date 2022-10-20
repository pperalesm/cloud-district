export interface NotificationsService {
  sendJoinedClub: () => Promise<void>;
  sendDroppedClub: () => Promise<void>;
}
