import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  result;

  constructor(private apiService : ApiService, private router : Router, private location : Location) { }

  ngOnInit(): void {
  }

  authUser() {
    this.apiService.authUser(this.username, this.password).subscribe(data => {
      if(data["authenticated"] === true) {
        console.log("Authenticated");
        sessionStorage.setItem("authenticated","true");
        sessionStorage.setItem("username",this.username);
        this.location.replaceState("/");
        this.router.navigate(["notes"]);
      } else {
        console.log("Failed to authenticate");
        sessionStorage.setItem("authenticated","false");
      }
    });
  }

}
