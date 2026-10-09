import { ChangeDetectionStrategy, signal } from '@angular/core';
import { Component, Input, Renderer2, inject } from '@angular/core';
import { SelectUserService } from '@shared/netflicks';
import { RouterLink } from '@angular/router';
import {
  LoadingSpinnerComponent,
  FullscreenIntroAnimationComponent,
} from '@shared/netflicks';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nf-profile-gate',
  templateUrl: './profile-gate.component.html',
  styleUrl: './profile-gate.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FullscreenIntroAnimationComponent,
    LoadingSpinnerComponent,
    NgClass,
    NgStyle,
    RouterLink,
  ],
})
export class ProfileGateComponent {
  statusUser = inject(SelectUserService);
  private renderer = inject(Renderer2);

  @Input() mainTitle = "Who's watching?";
  @Input() showManageProfile = false;

  isValidStatus = this.statusUser.isSelected;
  idUser = this.statusUser.selectedUserId;
  isLoading = signal(false);
  showFullScreenIntroAnimation = signal(false);

  constructor() {
    //Hide Scrollbar
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  onChangeUser(idUser: number) {
    this.statusUser.changeIdUser(idUser);
    this.isLoading.update((loading) => !loading);

    setTimeout(() => {
      this.showFullScreenIntroAnimation.update((show) => !show);
    }, 2000);

    //Change state user and remove scrollbar hidden
    setTimeout(() => {
      this.statusUser.changeState(!this.isValidStatus());
      this.statusUser.setStateUser();

      this.renderer.removeStyle(document.body, 'overflow-y');
    }, 5000);
  }

}
