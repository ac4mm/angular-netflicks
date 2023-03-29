import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SelectUserService } from './shared/services/select-user.service';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'netflicks';

  constructor(
    private authService: AuthService,
    private selectUser: SelectUserService
  ) { }

  ngOnInit() {
    // register Swiper custom elements
    register();
    
    this.authService.autoLogin();
    this.selectUser.getStateUser();
    this.selectUser.currState();
  }
}

