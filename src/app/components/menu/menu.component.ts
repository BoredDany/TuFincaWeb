import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private router: Router
  ) {}

  logoutUser() {
    localStorage.removeItem("jwt"); localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
