import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CommentSection } from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePosts } from "@/contexts/PostContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, User as UserIcon, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, deletePost } = usePosts();
  const { user } = useAuth();
  
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(post.id);
      navigate("/");
    }
  };

  const isAuthor = user && user.id === post.author_id;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {post.featured_image && (
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category?.name}</Badge>
            {isAuthor && (
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/edit/${post.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <img 
                src={post.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.username}`} 
                alt={post.author?.username}
                className="h-8 w-8 rounded-full border-2 border-primary/20"
              />
              <span className="font-medium">{post.author?.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{paragraph.slice(3)}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={idx} className="ml-6">{paragraph.slice(2)}</li>;
              }
              if (paragraph.startsWith('```')) {
                return null; // Skip code block markers for now
              }
              if (paragraph.trim()) {
                return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </div>

        <div className="border-t pt-8">
          <CommentSection postId={post.id} comments={post.comments || []} />
        </div>
      </div>
    </Layout>
  );
}
