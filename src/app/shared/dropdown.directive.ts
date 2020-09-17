import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  //@HostBinding('class.open') isOpen = false;

  searchBox: any = document.getElementsByClassName('search-box');

  constructor(private elRef: ElementRef) {}

  /*  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  } */

  @HostListener('document:click', ['$event'])
  clickEvent(event: Event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      this.searchBox[0].classList.toggle('active');
      console.log('clicked inside');
    } else {
      this.searchBox[0].classList.remove('active');
      console.log('clicked outside');
    }
  }
}
