import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rent } from '../../models/Rent';
import { RentService } from '../../services/rents/rent.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  rent: Rent | undefined;
  rentId: number | undefined;
  rents: Rent[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentService: RentService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rentService.getRents().then(rents => {
      this.rents = rents;
      console.log('Rents loaded:', this.rents);
    }).catch(error => {
      console.error('Failed to load rents', error);
    });
  }

  makePayment(rent: Rent): void {
    console.log('Processing payment for:', rent);
    this.rentService.putRent(rent).then(() => {
      console.log('Payment successful');
      this.router.navigate(['/payment-success']);
    }).catch(error => {
      console.error('Payment failed:', error);
    });
  }
  
}
