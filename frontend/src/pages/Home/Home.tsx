import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Brain,
  CheckCircle,
  Download,
  Sparkles,
  Rocket,
  Users,
  Shield,
} from "lucide-react";
import Auth from "../../components/Auth/Auth";
import { getCurrentUser } from "../../services/supabaseClient";
import type { User } from "@supabase/supabase-js";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Redirect to account if logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/account");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return <Auth onSuccess={() => window.location.reload()} />;
  }

  return null;
};
export default Home;
