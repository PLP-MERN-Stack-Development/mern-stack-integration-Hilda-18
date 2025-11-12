import { Link } from "react-router-dom";
import { Post } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group">
        {post.featured_image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute bottom-3 left-3 bg-secondary text-secondary-foreground">
              {post.category.name}
            </Badge>
          </div>
        )}
        
        <CardHeader>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {post.excerpt}
          </p>
        </CardHeader>
        
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              <span>{post.author.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{post.comments?.length || 0}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
