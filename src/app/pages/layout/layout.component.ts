import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  localDataObj : any;
  username: any = '';

  constructor(private router: Router) {
    const localData = localStorage.getItem('leaveUser')
    if (localData) {
      this.localDataObj = JSON.parse(localData)
      this.username = this.localDataObj
    }else{
      this.router.navigateByUrl('login')
    }
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('leaveUser')
    this.router.navigateByUrl('login')
  }

}
