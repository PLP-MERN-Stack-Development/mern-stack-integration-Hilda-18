export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  author?: Profile;
  post_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  author_id: string;
  author?: Profile;
  category_id: string;
  category?: Category;
  comments?: Comment[];
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: Profile | null;
  session: any;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface PostContextType {
  posts: Post[];
  categories: Category[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  getPostById: (id: string) => Post | undefined;
  createPost: (post: Partial<Post>) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
}
