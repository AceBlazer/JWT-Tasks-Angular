import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export  class AuthenticationService {

  private host: string = "http://localhost:8080";
  private jwtToken=null;
  private roles: Array<any>;

  constructor(
    private  http: HttpClient
  ) {}

  login (user) {
    return this.http.post(this.host+"/login", user, { observe:'response' });
  }

  saveToken(jwt:string) {
    this.jwtToken=jwt;
    localStorage.setItem('token', jwt);
    let jwth = new JwtHelperService();
    this.roles = jwth.decodeToken(this.jwtToken).roles;
  }

  loadToken() {
    this.jwtToken=localStorage.getItem('token');
  }

  getTasks() {
    if(this.jwtToken==null) this.loadToken();
    return this.http.get(this.host+"/tasks",
      { headers: new HttpHeaders({ 'Authorization': this.jwtToken }) });
  }

  logout() {
    this.jwtToken=null;
    localStorage.removeItem('token');
  }

  isAdmin() {
    for (let r of this.roles) {
      if (r.authority=='ADMIN') return true;
    }
    return false;
  }

  saveTask(task) {
    return this.http.post(this.host+"/tasks", task, { headers: new HttpHeaders({ 'Authorization': this.jwtToken }) });
  }

}
