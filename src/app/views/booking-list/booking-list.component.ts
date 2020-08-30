import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/service/booking/booking.service';
import { BookingResponse } from 'src/app/types/booking-response.type';
import { ROUTE } from '../../routing/routes.enum';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings: BookingResponse[];

  getLink(id: string): string {
    return '/' + ROUTE.BOOKING_INFO.replace(':id', id);
  }

  get cancelationRoute():string {
    return '/' + ROUTE.CANCELATION;
  }

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookings = this.bookingService.getBookings();
  }
}
