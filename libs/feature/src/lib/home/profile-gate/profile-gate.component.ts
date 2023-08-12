import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { SelectUserService } from '@shared/netflicks';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'nf-profile-gate',
  templateUrl: './profile-gate.component.html',
  styleUrls: ['./profile-gate.component.scss'],
})
export class ProfileGateComponent implements OnInit, OnDestroy {
  @Input() mainTitle = "Who's watching?";
  @Input() showManageProfile = false;

  idUser: number;
  isValidStatus = false;
  isLoading = false;

  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  private destroy$ = new Subject<void>();

  constructor(
    private statusUser: SelectUserService,
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
    this.isLoading = true;
    setTimeout(() => {
      this.statusUser.changeState(!this.isValidStatus);
      this.statusUser.currState();

      this.statusUser.changeIdUser(idUser);
      this.statusUser.setStateUser();

      this.renderer.removeStyle(document.body, 'overflow-y');
    }, 1000);
  }

  ngOnDestroy() {
    this.statusUserSub.unsubscribe();
    this.idUserSub.unsubscribe();
  }
}
