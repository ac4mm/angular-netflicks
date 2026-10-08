import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SelectUserService } from '@shared/netflicks';
import { NavbarComponent } from '@layout/netflicks';
import { AuthService } from '@core/auth';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'nf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private selectUser = inject(SelectUserService);

  title = 'netflicks';

  ngOnInit() {
    this.authService.autoLogin();
    this.selectUser.getStateUser();
    this.selectUser.currState();
  }
}
