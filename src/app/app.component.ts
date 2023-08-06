import { Component, OnInit } from '@angular/core';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { AuthService } from '@libs/feature';
import { SelectUserService } from '@shared/netflicks';

@Component({
  selector: 'nf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'netflicks';

  constructor(
    private authService: AuthService,
    private selectUser: SelectUserService
  ) {}

  ngOnInit() {
    // register Swiper custom elements
    register();

    this.authService.autoLogin();
    this.selectUser.getStateUser();
    this.selectUser.currState();
  }
}
