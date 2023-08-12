import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectUserService {
  selectUser = new BehaviorSubject<boolean>(false);
  private idUserSubject = new BehaviorSubject<number>(0);

  currentState$ = this.selectUser.asObservable();
  currentId$ = this.idUserSubject.asObservable();

  changeState(state: boolean) {
    this.selectUser.next(state);
  }

  logoutState() {
    this.selectUser.next(false);
    localStorage.removeItem('saveState');
    localStorage.removeItem('idUser');
  }

  currState() {
    console.log('current state:' + this.selectUser.getValue());
  }

  setStateUser() {
    localStorage.setItem(
      'saveState',
      JSON.stringify(this.selectUser.getValue())
    );
    localStorage.setItem(
      'idUser',
      JSON.stringify(this.idUserSubject.getValue())
    );
  }

  getStateUser() {
    const saveState = localStorage.getItem('saveState');
    if (saveState) this.selectUser.next(JSON.parse(saveState));

    const saveId = localStorage.getItem('idUser');
    if (saveId) this.idUserSubject.next(JSON.parse(saveId));
  }

  getIdUser() {
    return this.idUserSubject.getValue();
  }

  changeIdUser(idUser: number) {
    this.idUserSubject.next(idUser);
  }
}
