declare module 'swiper' {
  interface SwiperOptions {
    modules?: object[];
    observer?: boolean;
    observeParents?: boolean;
    observeSlideChildren?: boolean;
    autoHeight?: boolean;
    slidesOffsetBefore?: number;
    slidesOffsetAfter?: number;
    navigation?: {
      nextEl: string;
      prevEl: string;
    };
    pagination?: {
      el: string;
    };
    slidesPerView?: number;
    spaceBetween?: number;
    breakpoints?: Record<
      number,
      {
        slidesPerView: number;
        spaceBetween: number;
      }
    >;
  }

  export class Swiper {
    constructor(container: string | HTMLElement, options?: SwiperOptions);
  }

  export const A11y: object;
  export const Mousewheel: object;
  export const Navigation: object;
  export const Pagination: object;
}
