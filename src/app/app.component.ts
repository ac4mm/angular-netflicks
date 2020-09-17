import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SelectUserService } from './shared/select-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
  }
}
