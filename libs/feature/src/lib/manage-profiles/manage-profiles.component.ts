import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nf-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.scss']
})
export class ManageProfilesComponent implements OnInit {

  mainTitle = 'Manage Profiles:';

  constructor() { }

  ngOnInit(): void {
  }

}
