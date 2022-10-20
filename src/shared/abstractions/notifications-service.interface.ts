export interface NotificationsService {
  sendRegisteredToClub: () => Promise<void>;
  sendDroppedFromClub: () => Promise<void>;
}
