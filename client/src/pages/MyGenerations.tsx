import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { Loader2Icon, FolderIcon, PlusIcon } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MyGenerations = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching current user's projects
    setTimeout(() => {
      // In a real app, we'd filter by user ID
      setProjects(dummyGenerations.filter(p => !p.isPublished));
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2Icon className="size-8 animate-spin text-violet-500 mb-4" />
        <p className="text-gray-400">Fetching your workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mb-28 mt-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-violet-400 mb-2">
              <FolderIcon className="size-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Workspace</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">My Creations</h1>
            <p className="text-gray-400 mt-2">Manage and view all your generated assets.</p>
          </div>
          <Link
            to="/generate"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-violet-600/20 w-fit"
          >
            <PlusIcon className="size-5" />
            New Generation
          </Link>
        </header>

        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                gen={project}
                forCommunity={false}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <FolderIcon className="size-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-400 text-center max-w-xs mb-8">
              Start creating stunning AI-generated lifestyle images for your products.
            </p>
            <Link
              to="/generate"
              className="text-violet-400 hover:text-violet-300 font-medium flex items-center gap-2"
            >
              Go to Generator
              <PlusIcon className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGenerations;