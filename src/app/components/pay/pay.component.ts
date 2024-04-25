import { Component } from '@angular/core';
import { RentService } from '../../services/rents/rent.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Rent } from '../../models/Rent';
import { PaymentService } from '../../services/payments/payment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Account } from '../../models/Account';
import { BankAccountService } from '../../services/bankAccounts/bank-account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Payment } from '../../models/Payment';
import { Status } from '../../models/status';
import { Approval } from '../../models/Approval';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {
  user: User;
  rent: Rent;
  payment: Payment;
  accounts: Account[] = [];

  paymentForm = new FormGroup({
    account: new FormControl(''),
    amount: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private accountService: BankAccountService,
    private rentService: RentService,
    private paymentService: PaymentService,
  ) {
    this.user = {} as User;
    this.rent = {} as Rent;
    this.payment = {} as Payment;
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadRent();
  }

  loadAccounts() {
    this.accountService
      .getAccounts()
      .then((accounts) => {
        this.accounts = accounts;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadRent() {
    const id = this.getRentIdFromUrl();
    this.rentService
      .getRentById(id)
      .then((rent) => {
        this.rent = rent;
        this.paymentForm.patchValue({ amount: rent.price.toString() }); // Convierte el valor a string
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getRentIdFromUrl(): number {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    return id;
  }

  makePayment() {
    //registrar pago
    this.payment = new Payment(
      0,
      2,
      this.rent.ownerId,
      this.rent.idRent,
      this.rent.price,
      Status.ACTIVE
    );

    this.paymentService
      .postPayment(this.payment)
      .then(() => {
        console.log('Payment posted successfully');
      })
      .catch((error) => {
        console.error('Error posting payment:', error);
      });

    //cambiar estado de renta

    this.rent.rentStatus = Approval.PAYED;

    this.rentService
      .putRent(this.rent)
      .then(() => {
        console.log('Rent updated successfully');
      })
      .catch((error) => {
        console.error('Error updating rent:', error);
      });

    
  }
}
