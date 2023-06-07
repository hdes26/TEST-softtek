export interface Movie {
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
export interface CreateMovie {
    title: string;
    releaseYear: number;
    director: string;
    genre: string;
    durationMinutes: number;
    rating: number;
    description: string;
  }

export interface UpdateMovie {
    title: string;
    rating: number;
    description: string;
    done: boolean;
  }
