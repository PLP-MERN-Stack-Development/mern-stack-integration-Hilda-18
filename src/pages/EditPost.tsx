import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PostForm } from "@/components/PostForm";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/contexts/PostContext";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getPostById } = usePosts();
  const navigate = useNavigate();
  
  const post = id ? getPostById(id) : undefined;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (post && user.id !== post.author_id) {
      navigate("/");
    }
  }, [user, post, navigate]);

  if (!user || !post) return null;

  return (
    <Layout>
      <PostForm post={post} isEdit />
    </Layout>
  );
}
