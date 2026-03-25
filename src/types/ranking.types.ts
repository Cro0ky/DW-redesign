export interface IRankingRow extends Record<string, unknown> {
  id: string;
  position: number;
  win_percentage: number;
  avatar_number: number;
  username: string;
  rank: string;
  frame_number: number;
  experience: number;
}

export interface IPaginatedRanking {
  count: number;
  next: string | null;
  previous: string | null;
  my_position: number | null;
  results: IRankingRow[];
}
