export interface BookingConfig {
  institution: string;
  area: string;
  from_date: string;
  from_time: string;
  until_time: string;
  fitting: string[];
  readernumber?: string;
  token?: string;
}
