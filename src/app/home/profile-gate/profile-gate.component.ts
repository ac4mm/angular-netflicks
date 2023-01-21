import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectUserService } from 'src/app/shared/select-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-gate',
  templateUrl: './profile-gate.component.html',
  styleUrls: ['./profile-gate.component.css'],
})
export class ProfileGateComponent implements OnInit, OnDestroy {
  idUser: number;
  isValidStatus: boolean = false;
  isLoading: boolean = false;

  private statusUserSub: Subscription;
  private idUserSub: Subscription;

  constructor(private statusUser: SelectUserService) {}

  ngOnInit(): void {
    this.statusUserSub = this.statusUser.currentState.subscribe(
      (state) => (this.isValidStatus = !!state)
    );

    this.idUserSub = this.statusUser.currentId.subscribe(
      (id) => (this.idUser = id)
    );
  }

  onChangeUser(idUser: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.statusUser.changeState(!this.isValidStatus);
      this.statusUser.currState();
      
      this.statusUser.changeIdUser(idUser);
      this.statusUser.setStateUser();
    }, 1000);
  }

  ngOnDestroy() {
    this.statusUserSub.unsubscribe();
    this.idUserSub.unsubscribe();
  }
  currentStyles: {};
  setPropertyLoadingSpinner() {
    this.currentStyles = {
      width: '150px',
      height: '150px',
    };
  }
}
