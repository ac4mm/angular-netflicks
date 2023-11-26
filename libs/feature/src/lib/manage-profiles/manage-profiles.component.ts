import { Component } from '@angular/core';
import { ProfileGateComponent } from '../home/profile-gate/profile-gate.component';

@Component({
    selector: 'nf-manage-profiles',
    template: `
    <nf-profile-gate
      [mainTitle]="mainTitle"
      [showManageProfile]="true"
    ></nf-profile-gate>
  `,
    standalone: true,
    imports: [ProfileGateComponent],
})
export class ManageProfilesComponent {
  mainTitle = 'Manage Profiles:';
}
