import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
binding: any;
username: string = '';
password: string = '';

loginObj: any = {
  'username' : '',
  'password' : ''
}

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const body = {
      username: this.username,
      password: this.password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post<any>('http://localhost:7000/api/login', this.loginObj, { headers }).subscribe(data => {
      // this.totalAngularPackages = data.total;
      if(data.result){

        localStorage.setItem('leaveUser' , JSON.stringify(data.data))
        this.router.navigateByUrl('dashboard')
        console.log(data)
      }else{
        alert(data.message)
      }
  })
  }

}
