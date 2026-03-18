export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  author: string;
  likes: number;
  createdAt: string;
}

export interface PostsResponse {
  items: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CreatePostPayload {
  caption: string;
  author: string;
  image?: File;
}
