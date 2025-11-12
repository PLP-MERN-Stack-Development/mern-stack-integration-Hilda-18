import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Post, PostContextType, Category } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useAuth();

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    
    setCategories(data || []);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles(*),
        category:categories(*),
        comments(
          *,
          author:profiles(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const createPost = async (postData: Partial<Post>) => {
    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: postData.title || "",
        content: postData.content || "",
        excerpt: postData.excerpt || "",
        featured_image: postData.featured_image,
        author_id: user.id,
        category_id: postData.category_id || categories[0]?.id,
      }])
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .single();
    
    if (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } else {
      setPosts(prev => [data, ...prev]);
      toast.success("Post created successfully!");
    }
    setIsLoading(false);
  };

  const updatePost = async (id: string, postData: Partial<Post>) => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        featured_image: postData.featured_image,
        category_id: postData.category_id,
      })
      .eq('id', id)
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .single();
    
    if (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    } else {
      setPosts(prev => prev.map(post => 
        post.id === id ? data : post
      ));
      toast.success("Post updated successfully!");
    }
    setIsLoading(false);
  };

  const deletePost = async (id: string) => {
    setIsLoading(true);
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } else {
      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success("Post deleted successfully!");
    }
    setIsLoading(false);
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        content,
        post_id: postId,
        author_id: user.id,
      }])
      .select(`
        *,
        author:profiles(*)
      `)
      .single();
    
    if (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } else {
      setPosts(prev => prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), data] }
          : post
      ));
      toast.success("Comment added!");
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      categories,
      isLoading,
      searchQuery,
      selectedCategory,
      setSearchQuery,
      setSelectedCategory,
      getPostById,
      createPost,
      updatePost,
      deletePost,
      addComment
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
