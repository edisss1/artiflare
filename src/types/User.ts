export interface User {
  uid: string;
  img: string | null;
  displayName: string | null;
  email: string | null;
  teams: string[];
  boards: string[];
}
