import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOut, supabase } from "../../services/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface Generation {
  id: string;
  user_id: string;
  summary: string;
  prompt: string;
  created_at: string;
}

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          navigate("/");
          return;
        }
        setUser(currentUser);

        // Fetch user's past generations
        const { data, error: queryError } = await supabase
          .from("generations")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (queryError) {
          console.warn("Generations table may not exist:", queryError);
          setGenerations([]);
        } else {
          setGenerations(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-2">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Past Generations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Past Generations
          </h2>

          {generations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600 mb-4">
                No past generations yet. Create one now!
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Resume Builder
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {generations.map((gen) => (
                <div
                  key={gen.id}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(gen.created_at).toLocaleString()}
                      </p>
                      {gen.prompt && (
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Prompt:</strong> {gen.prompt}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-4">
                    <p className="text-gray-900">{gen.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
