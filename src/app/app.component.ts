import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JwtTasks';


  constructor(
    private auths: AuthenticationService,
    private router: Router
  ) {
  }

  onLogout() {
    this.auths.logout();
    this.router.navigateByUrl("/login");
  }
}


