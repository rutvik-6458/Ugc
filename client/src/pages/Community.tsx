import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { Loader2Icon, Sparkles } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

const Community = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    // Simulating API call
    setTimeout(() => {
      setProjects(dummyGenerations);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="relative">
          <Loader2Icon className="size-10 animate-spin text-violet-500" />
          <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full animate-pulse" />
        </div>
        <p className="text-gray-400 font-medium animate-pulse tracking-wide">
          Loading Community Creations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mb-28 mt-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-violet-400 mb-4">
              <Sparkles className="size-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Inspiration</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Community Gallery
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore stunning visuals created by our users. See how UGC.ai transforms simple product photos into professional marketing assets.
            </p>
          </motion.div>
        </header>

        {/* Project List - Masonry-like columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              gen={project}
              setGenerations={setProjects}
              forCommunity={true}
            />
          ))}
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <p className="text-gray-500">No projects found in the community.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;