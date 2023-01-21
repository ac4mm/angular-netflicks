import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectUserService {
  selectUser = new BehaviorSubject<boolean>(false);
  private idUserSubject = new BehaviorSubject<number>(0);

  currentState = this.selectUser.asObservable();
  currentId = this.idUserSubject.asObservable();

  //userLink: string;

  constructor() { }

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
    let saveState = localStorage.getItem('saveState');
    this.selectUser.next(JSON.parse(saveState));
    
    let saveId = localStorage.getItem('idUser');
    this.idUserSubject.next(JSON.parse(saveId));
  }

  /*  getIdUser(idUser: number) {
    for (let key in this.imgIdUsers) {
      let keyValue: number = +key;
      if (keyValue === idUser) {
        this.userLink = this.imgIdUsers[keyValue].link;
        return this.userLink;
      }
    }
    return;
  } */

  getIdUser() {
    console.log('current id:' + this.idUserSubject.getValue());
  }

  changeIdUser(idUser: number) {
    this.idUserSubject.next(idUser);
    /* console.log('id changed to:' + idUser); */
  }
}
