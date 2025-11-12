import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PostForm } from "@/components/PostForm";
import { useAuth } from "@/contexts/AuthContext";

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <PostForm />
    </Layout>
  );
}
