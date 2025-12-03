export interface Review {
  id: string;
  professorId: string;
  studentName: string; // Anonymous allowed
  rating: number; // 1-5
  attendance: number; // 1 (Never) to 5 (Always)
  grading: number; // 1 (Unfair) to 5 (Very Fair)
  difficulty: number; // 1 (Very Hard) to 5 (Very Easy)
  text: string;
  date: string;
  likes: number;
}

export interface Professor {
  id: string;
  name: string;
  university: string;
  department: string;
  image: string;
  reviews: Review[];
}

export interface SearchFilters {
  query: string;
  university: string;
}
