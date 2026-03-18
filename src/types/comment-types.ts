export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface CommentsResponse {
  postId: string;
  items: Comment[];
}
