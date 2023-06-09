export interface IAddMovie {
  title: string;
  releaseYear: number;
  director: string;
  genre: string;
  durationMinutes: number;
  rating: number;
  description: string;
}


export interface IMovie {
  id:string
  title: string;
  releaseYear: number;
  director: string;
  genre: string;
  durationMinutes: number;
  rating: number;
  description?: string;
  done: boolean
}

export interface IUpdateMovie {
  title: string;
  rating: number;
  description: string;
  done: boolean;
}