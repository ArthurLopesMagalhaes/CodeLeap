export interface PostsResponse {
  count: number;
  next: any;
  previous: string;
  results: PostData[];
}

export interface PostData {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface SendPost {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePost {
  title: string;
  content: string;
}
