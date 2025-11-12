import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PenSquare, LogOut, User, Home } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <span>✍️ BlogSpace</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            
            {user ? (
              <>
                <Button variant="default" size="sm" asChild>
                  <Link to="/create">
                    <PenSquare className="h-4 w-4 mr-2" />
                    New Post
                  </Link>
                </Button>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l">
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                      alt={user.username}
                      className="h-8 w-8 rounded-full border-2 border-primary"
                    />
                    <span className="text-sm font-medium hidden sm:inline">{user.username}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
      
      <main className="container py-8">
        {children}
      </main>
      
      <footer className="border-t bg-muted/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 BlogSpace. Ready to connect to your MERN backend.</p>
          <p className="mt-2">Built with React, TypeScript & Vite</p>
        </div>
      </footer>
    </div>
  );
}
