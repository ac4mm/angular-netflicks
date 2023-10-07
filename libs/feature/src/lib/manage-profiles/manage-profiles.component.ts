import { Component } from '@angular/core';

@Component({
  selector: 'nf-manage-profiles',
  template: `
    <nf-profile-gate
      [mainTitle]="mainTitle"
      [showManageProfile]="true"
    ></nf-profile-gate>
  `,
})
export class ManageProfilesComponent {
  mainTitle = 'Manage Profiles:';
}
