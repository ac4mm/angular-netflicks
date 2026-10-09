import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ProfileGateComponent } from '../home/profile-gate/profile-gate.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
