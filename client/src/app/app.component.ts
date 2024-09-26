//I HAVE ADDED COMMENTS FOR BETTE R UNDERSTANDING OF THE CODE
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './reservation.service';

// Define the structure of a Seat object with an interface
interface Seat {
  id: number; // Unique ID for the seat
  row: number; // The row number of the seat
  column: number; // The column number of the seat
  isReserved: boolean; // Indicates if the seat is reserved
  isSelected: boolean; // Indicates if the seat is selected by the user
}

@Component({
  selector: 'my-app', // The component's selector in HTML
  templateUrl: './app.component.html', // HTML template file for the component
  styleUrls: ['./app.component.css'], // CSS file for component styling
  standalone: true, // Indicates that this is a standalone component
  imports: [CommonModule, FormsModule, HttpClientModule], // Import common Angular modules
  providers: [ReservationService], // Provide the ReservationService for use in this component
})
export class AppComponent implements OnInit {
  // Seats are stored in a 2D array where each row is an array of Seat objects
  seats: Seat[][] = [];
  // Tracks the seats that the user has selected
  selectedSeats: Seat[] = [];
  // Maximum number of seats that can be selected at once
  maxSeats = 7;

  // Inject the ReservationService to handle API requests
  constructor(private reservationService: ReservationService) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit() {
    this.initializeSeats(); // Initialize the seat layout
    this.loadReservedSeats(); // Fetch reserved seats from the server
  }

  // Initializes a 12-row seat layout, with 7 seats per row except the last row, which has 3 seats
  initializeSeats() {
    for (let row = 0; row < 12; row++) {
      const seatRow: Seat[] = [];
      for (let col = 0; col < (row === 11 ? 3 : 7); col++) {
        // Create a new seat with ID, row, column, and initial status (not reserved or selected)
        seatRow.push({
          id: row * 7 + col + 1, // Generate seat ID based on row and column
          row: row + 1, // Row number (1-based index)
          column: col + 1, // Column number (1-based index)
          isReserved: false, // Initially, the seat is not reserved
          isSelected: false, // Initially, the seat is not selected
        });
      }
      this.seats.push(seatRow); // Add the row of seats to the seats array
    }
  }

  // Loads reserved seats by fetching data from the ReservationService API
  loadReservedSeats() {
    this.reservationService.getReservedSeats().subscribe(
      (reservedSeats) => {
        // Loop through the reserved seat IDs and mark them as reserved in the seat layout
        reservedSeats.forEach((seatId) => {
          const seat = this.findSeatById(seatId);
          if (seat) {
            seat.isReserved = true; // Mark the seat as reserved
          }
        });
      },
      (error) => {
        console.error('Error loading reserved seats:', error); // Handle errors from the API
      }
    );
  }

  // Handles seat selection toggling by the user
  toggleSeatSelection(seat: Seat) {
    if (!seat.isReserved) {
      // Only allow selection if the seat is not reserved
      if (seat.isSelected) {
        // If seat is already selected, deselect it
        seat.isSelected = false;
        this.selectedSeats = this.selectedSeats.filter((s) => s.id !== seat.id); // Remove it from selectedSeats
      } else if (this.selectedSeats.length < this.maxSeats) {
        // If the seat is not selected and the user has not exceeded the max selection limit, select it
        seat.isSelected = true;
        this.selectedSeats.push(seat); // Add the seat to selectedSeats array
      } else {
        // If user exceeds the max seat limit, show an alert
        alert(`You can only select up to ${this.maxSeats} seats at a time.`);
      }
    }
  }

  // Reserves the selected seats by sending their IDs to the ReservationService API
  reserveSeats() {
    if (this.selectedSeats.length === 0) {
      // Show an alert if no seats are selected
      alert('Please select at least one seat.');
      return;
    }

    // Get the IDs of the selected seats
    const seatIds = this.selectedSeats.map((seat) => seat.id);
    this.reservationService.reserveSeats(seatIds).subscribe(
      () => {
        // On successful reservation, mark the selected seats as reserved and reset selection
        this.selectedSeats.forEach((seat) => {
          seat.isReserved = true;
          seat.isSelected = false;
        });
        this.selectedSeats = []; // Clear the selectedSeats array
        alert('Seats reserved successfully!');
      },
      (error) => {
        console.error('Error reserving seats:', error); // Handle errors during seat reservation
        alert('Failed to reserve seats. Please try again.');
      }
    );
  }

  // Returns a CSS class based on the seat's status
  getSeatClass(seat: Seat): string {
    if (seat.isReserved) return 'reserved'; // Reserved seats have a 'reserved' class
    if (seat.isSelected) return 'selected'; // Selected seats have a 'selected' class
    return 'available'; // Available seats have an 'available' class
  }

  // Finds a seat by its ID in the 2D seats array
  private findSeatById(id: number): Seat | undefined {
    for (const row of this.seats) {
      const seat = row.find((s) => s.id === id);
      if (seat) return seat; // Return the seat if found
    }
    return undefined; // Return undefined if seat is not found
  }
}
