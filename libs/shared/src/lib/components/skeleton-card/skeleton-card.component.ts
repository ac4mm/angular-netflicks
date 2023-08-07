import { Component } from '@angular/core';

@Component({
  selector: 'nf-skeleton-card',
  template: `
  <div class="container-sm">
  <div class="row row-skeleton">
    <div class="row">
      <div class="col-12">
        <p-skeleton width="20rem" styleClass="mb-2"></p-skeleton>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
    </div>
  </div>

  <div class="row row-skeleton">
    <div class="row">
      <div class="col-12">
        <p-skeleton width="20rem" styleClass="mb-2"></p-skeleton>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
    </div>
  </div>

  <div class="row row-skeleton">
    <div class="row">
      <div class="col-12">
        <p-skeleton width="20rem" styleClass="mb-2"></p-skeleton>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
    </div>
  </div>

  <div class="row row-skeleton">
    <div class="row">
      <div class="col-12">
        <p-skeleton width="20rem" styleClass="mb-2"></p-skeleton>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
      <div class="col-sm-2">
        <p-skeleton width="213px" height="133px"></p-skeleton>
      </div>
    </div>
  </div>

</div>

  `,
  styles: [`
  @media (min-width: 1200px) {
    .container-xl,
    .container-lg,
    .container-md,
    .container-sm,
    .container {
      max-width: 1350px !important;
    }
  
    .container-sm {
      margin-top: 60px;
      margin-bottom: 60px;
    }
  }
  
  .row-skeleton {
    margin: 10px 0;
  }
  `],
})
export class SkeletonCardComponent {}