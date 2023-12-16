import { Component } from '@angular/core';

@Component({
  selector: 'nf-footer',
  template: `
    <div class="member-footer">
      <!-- Social Links -->
      <div class="social-links">
        <a class="social-link" href="https://www.facebook.com/netflix">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon svg-icon-facebook-logo"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.9868 13.1621V21.9841H10.0418V13.1621H6.8418V9.51207H10.0468V6.73207C10.0468 3.56707 11.9318 1.82007 14.8148 1.82007C15.7616 1.83321 16.7061 1.91577 17.6408 2.06707V5.17307H16.0448C15.4952 5.10007 14.9422 5.28088 14.5419 5.66447C14.1415 6.04807 13.9373 6.59284 13.9868 7.14507V9.51207H17.4868L16.9278 13.1621H13.9868Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <a class="social-link" href="https://www.instagram.com/netflix">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon svg-icon-instagram-logo"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.9302 16.1229C21.9586 17.6764 21.3791 19.1796 20.3152 20.3119C19.1853 21.3804 17.68 21.9606 16.1252 21.9269C14.4742 22.0209 9.52524 22.0209 7.87524 21.9269C6.32151 21.955 4.81816 21.3756 3.68524 20.3119C2.61778 19.1818 2.03769 17.6772 2.07024 16.1229C1.97724 14.4719 1.97724 9.52294 2.07024 7.87294C2.03979 6.3188 2.61957 4.8146 3.68524 3.68294C4.81792 2.61946 6.32187 2.04157 7.87524 2.07294C9.52624 1.97894 14.4752 1.97894 16.1252 2.07294C17.6791 2.04388 19.1828 2.62347 20.3152 3.68794C21.3827 4.81807 21.9628 6.32272 21.9302 7.87694C22.0232 9.52794 22.0232 14.4719 21.9302 16.1229ZM20.2002 11.9999C20.2002 10.5449 20.3202 7.42194 19.8002 6.10594C19.4575 5.23672 18.7695 4.54869 17.9002 4.20594C16.5882 3.68894 13.4612 3.80594 12.0062 3.80594C10.5512 3.80594 7.42824 3.68494 6.11224 4.20594C5.24322 4.54899 4.55529 5.23693 4.21224 6.10594C3.69524 7.41794 3.81224 10.5449 3.81224 11.9999C3.81224 13.4549 3.69124 16.5779 4.21224 17.8939C4.5556 18.7628 5.24343 19.4506 6.11224 19.7939C7.42424 20.3109 10.5522 20.1939 12.0062 20.1939C13.4602 20.1939 16.5842 20.3149 17.9002 19.7939C18.7693 19.4509 19.4572 18.763 19.8002 17.8939C20.3192 16.5819 20.2002 13.4549 20.2002 11.9999ZM17.1302 11.9999C17.1302 14.8311 14.8354 17.1264 12.0042 17.1269C9.17307 17.1275 6.87734 14.8331 6.87624 12.0019C6.87513 9.17077 9.16907 6.8746 12.0002 6.87293C13.361 6.87028 14.6668 7.40953 15.6292 8.37155C16.5916 9.33356 17.1314 10.6392 17.1292 11.9999H17.1302ZM15.3362 11.9999C15.3362 10.1596 13.8446 8.66749 12.0042 8.66694C10.1639 8.66639 8.67134 10.1576 8.67024 11.9979C8.66914 13.8383 10.1599 15.3313 12.0002 15.3329C13.8409 15.3318 15.333 13.8406 15.3352 11.9999H15.3362ZM17.3362 7.85895C16.6735 7.85895 16.1362 7.32168 16.1362 6.65894C16.1362 5.9962 16.6735 5.45894 17.3362 5.45894C17.999 5.45894 18.5363 5.9962 18.5363 6.65894C18.5381 6.97725 18.4127 7.28311 18.1879 7.50847C17.9631 7.73383 17.6576 7.86001 17.3392 7.85895H17.3362Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <a class="social-link" href="https://twitter.com/netflix">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon svg-icon-twitter-logo"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.7679 8.20699C20.7912 11.5932 19.4564 14.8475 17.0619 17.242C14.6674 19.6365 11.4131 20.9713 8.02688 20.948C5.58911 20.9544 3.2014 20.2564 1.15088 18.938C1.50985 18.9771 1.87079 18.9955 2.23188 18.993C4.24756 18.9984 6.20627 18.3245 7.79188 17.08C5.87426 17.0472 4.18959 15.799 3.59988 13.974C3.8797 14.0187 4.16251 14.0421 4.44588 14.044C4.84342 14.0428 5.23922 13.9914 5.62388 13.891C3.53625 13.4666 2.03658 11.6303 2.03788 9.49999V9.44099C2.65823 9.78763 3.35178 9.98261 4.06188 10.01C2.08967 8.6933 1.48213 6.06953 2.67488 4.01999C4.9496 6.82015 8.30584 8.52335 11.9089 8.70599C11.8373 8.36899 11.8008 8.0255 11.7999 7.68099C11.8012 5.84293 12.9247 4.19202 14.634 3.51624C16.3433 2.84045 18.292 3.27679 19.5499 4.61699C20.552 4.4234 21.513 4.0573 22.3899 3.53499C22.0555 4.56892 21.3554 5.44537 20.4209 5.99999C21.3101 5.89964 22.1793 5.66707 22.9999 5.30999C22.3865 6.20227 21.6272 6.98488 20.7539 7.62499C20.7679 7.81999 20.7679 8.01399 20.7679 8.20699Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <a
          class="social-link"
          href="https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon svg-icon-youtube-logo"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.5401 6.67C22.2881 5.71873 21.5491 4.97331 20.6001 4.713C18.8801 4.25 12.0001 4.25 12.0001 4.25C12.0001 4.25 5.12009 4.25 3.40009 4.713C2.45106 4.97331 1.71211 5.71873 1.46009 6.67C1.14277 8.42869 0.988785 10.213 1.00009 12C0.988785 13.787 1.14277 15.5713 1.46009 17.33C1.71301 18.2825 2.45414 19.0282 3.40509 19.287C5.12009 19.75 12.0051 19.75 12.0051 19.75C12.0051 19.75 18.8851 19.75 20.6001 19.287C21.5491 19.0267 22.2881 18.2813 22.5401 17.33C22.8574 15.5713 23.0114 13.787 23.0001 12C23.0114 10.213 22.8574 8.42869 22.5401 6.67ZM9.75009 15.27V8.729L15.5001 12L9.75009 15.27Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>

      <!-- Member footer links -->
      <ul class="member-footer-links">
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://www.netflix.com/browse/audio-description"
            ><span class="member-footer-link-content"
              >Audio Description</span
            ></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="https://help.netflix.com/"
            ><span class="member-footer-link-content">Help Center</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="https://www.netflix.com/redeem"
            ><span class="member-footer-link-content">Gift Cards</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="https://media.netflix.com/"
            ><span class="member-footer-link-content">Media Center</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="http://ir.netflix.com/"
            ><span class="member-footer-link-content"
              >Investor Relations</span
            ></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="https://jobs.netflix.com/"
            ><span class="member-footer-link-content">Jobs</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://help.netflix.com/legal/termsofuse"
            ><span class="member-footer-link-content">Terms of Use</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://help.netflix.com/legal/privacy"
            ><span class="member-footer-link-content">Privacy</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://help.netflix.com/legal/notices"
            ><span class="member-footer-link-content">Legal Notices</span></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a class="member-footer-link" href="https://www.netflix.com/Cookies"
            ><span class="member-footer-link-content"
              >Cookie Preferences</span
            ></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://help.netflix.com/legal/corpinfo"
            ><span class="member-footer-link-content"
              >Corporate Information</span
            ></a
          >
        </li>
        <li class="member-footer-link-wrapper">
          <a
            class="member-footer-link"
            href="https://help.netflix.com/contactus"
            ><span class="member-footer-link-content">Contact Us</span></a
          >
        </li>
      </ul>

      <!-- Member footer services -->
      <div class="member-footer-service">
        <button class="service-code" (click)="itemServiceCodeClicked()">
          {{ servicesCode }}
        </button>
      </div>

      <!-- Member footer copyright -->
      <div class="member-footer-copyright">
        <span>© 1997-{{ getCurrentYear() }} Netflix, Inc.‎</span>
      </div>
    </div>
  `,
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {
  servicesCode = 'Service code';

  //Services code
  itemServiceCodeClicked() {
    this.servicesCode = '079-255';
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
