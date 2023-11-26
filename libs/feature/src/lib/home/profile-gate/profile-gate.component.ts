import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { SelectUserService } from '@shared/netflicks';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import {
  LoadingSpinnerComponent,
  FullscreenIntroAnimationComponent,
} from '@shared/netflicks';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'nf-profile-gate',
  templateUrl: './profile-gate.component.html',
  styleUrls: ['./profile-gate.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    FullscreenIntroAnimationComponent,
    LoadingSpinnerComponent,
    NgFor,
    NgClass,
    NgStyle,
    RouterLink,
  ],
})
export class ProfileGateComponent implements OnInit, OnDestroy {
  @Input() mainTitle = "Who's watching?";
  @Input() showManageProfile = false;

  idUser: number;
  isValidStatus = false;
  isLoading = false;

  showFullScreenIntroAnimation = false;

  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  private destroy$ = new Subject<void>();

  constructor(
    public statusUser: SelectUserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.statusUserSub = this.statusUser.currentState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.isValidStatus = !!state));

    this.idUserSub = this.statusUser.currentId$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => (this.idUser = id));

    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  onChangeUser(idUser: number) {
    this.statusUser.changeIdUser(idUser);
    this.isLoading = !this.isLoading;

    setTimeout(() => {
      this.showFullScreenIntroAnimation = !this.showFullScreenIntroAnimation;
    }, 2000);

    //Change state user and remove scrollbar hidden
    setTimeout(() => {
      this.statusUser.changeState(!this.isValidStatus);
      this.statusUser.currState();
      this.statusUser.setStateUser();

      this.renderer.removeStyle(document.body, 'overflow-y');
    }, 5000);
  }

  ngOnDestroy() {
    this.statusUserSub.unsubscribe();
    this.idUserSub.unsubscribe();
  }
}
