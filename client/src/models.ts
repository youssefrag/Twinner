export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  content: string;
  date: Date;
  tags: Tag[];
}

export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  content: string;
}
