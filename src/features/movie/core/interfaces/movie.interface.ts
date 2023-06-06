export interface IAddMovie {
  title: string;
  releaseYear: number;
  director: string;
  genre: string[];
  durationMinutes: number;
  rating: number;
  description?: string;
}

export interface IUpdateMovie extends IAddMovie {
  done: boolean
}