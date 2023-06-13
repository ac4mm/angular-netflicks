import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { SelectUserService } from '@shared/services/select-user.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'nf-profile-gate',
  templateUrl: './profile-gate.component.html',
  styleUrls: ['./profile-gate.component.scss'],
})
export class ProfileGateComponent implements OnInit, OnDestroy {
  @Input() mainTitle: string = "Who's watching?";
  @Input() showManageProfile: boolean = false;
  
  idUser: number;
  isValidStatus: boolean = false;
  isLoading: boolean = false;

  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  currentStyles: {};

  private destroy$ = new Subject<void>();

  constructor(private statusUser: SelectUserService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.statusUserSub = this.statusUser.currentState$.pipe(takeUntil(this.destroy$)).subscribe(
      (state) => (this.isValidStatus = !!state)
    );

    this.idUserSub = this.statusUser.currentId$.pipe(takeUntil(this.destroy$)).subscribe(
      (id) => (this.idUser = id)
    );

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

  setPropertyLoadingSpinner() {
    this.currentStyles = {
      width: '150px',
      height: '150px',
    };
  }
}
