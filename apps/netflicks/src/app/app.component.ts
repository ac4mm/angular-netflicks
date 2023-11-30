import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SelectUserService } from '@shared/netflicks';
import { NavbarComponent } from '@layout/netflicks';
import { AuthService } from '@core/auth';

@Component({
  selector: 'nf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'netflicks';

  constructor(
    private authService: AuthService,
    private selectUser: SelectUserService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.selectUser.getStateUser();
    this.selectUser.currState();
  }
}
