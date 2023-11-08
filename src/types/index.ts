export type requestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type SignUpInputDataType = {
  name: string;
  email: string;
  password: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  preferences: any;
};

export interface Sport {
  id: number;
  name: string;
}

export interface Article {
  title: string;
  thumbnail: string;
  summary: string;
  id: number;
  teams: Team[];
  content: string;
  date: string;
  sport: Team;
}

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
  score: Score;
}

export interface Score {
  [key: string]: string;
}
export interface Team {
  id: number;
  name: string;
  plays: string;
}
