import { BookingConfig } from './booking-config.type';

export interface BookingResponse {
  bookingCode: string;
  email: string;
  message: string;
  workspaceId: string;
  /** set on client */
  config?: BookingConfig;
}
