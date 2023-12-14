export type RatingNumberObject = { [key: number]: number };

//7+ Kids (10%), 13+ teenagers (20%), 16+ (40%), 18+ adults (60%)
export const INIT_RATING_NUMBER: RatingNumberObject = {
  7: 0.1,
  13: 0.2,
  16: 0.4,
  18: 0.6,
};
