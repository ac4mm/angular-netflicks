import { Component, OnInit } from '@angular/core';
import { SelectUserService } from '@shared/netflicks';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@feature/netflicks';
import { AuthService } from '@data-access/auth';

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
