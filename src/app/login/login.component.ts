import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  mode: number=0;

  constructor(
    private auths: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(user) {
    this.auths.login(user).subscribe(resp=> {
      let jwt=resp.headers.get('Authorization');
      //console.log(jwt);
      this.auths.saveToken(jwt);
      this.router.navigateByUrl('/tasks');

    }, err=> {
      this.mode=1;
    });
  }

}
