import { Injectable, signal } from '@angular/core';

@Injectable()
export class SelectUserService {
  isSelected = signal(false);
  selectedUserId = signal(0);

  changeState(state: boolean) {
    this.isSelected.set(state);
  }

  logoutState() {
    this.isSelected.set(false);
    localStorage.removeItem('saveState');
    localStorage.removeItem('idUser');
  }

  setStateUser() {
    localStorage.setItem(
      'saveState',
      JSON.stringify(this.isSelected())
    );
    localStorage.setItem(
      'idUser',
      JSON.stringify(this.selectedUserId())
    );
  }

  getStateUser() {
    const saveState = localStorage.getItem('saveState');
    if (saveState) this.isSelected.set(JSON.parse(saveState));

    const saveId = localStorage.getItem('idUser');
    if (saveId) this.selectedUserId.set(JSON.parse(saveId));
  }

  getIdUser() {
    return this.selectedUserId();
  }

  changeIdUser(idUser: number) {
    this.selectedUserId.set(idUser);
  }
}
