import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { Loader2Icon, ArrowLeftIcon, DownloadIcon, Share2Icon, ExternalLinkIcon } from "lucide-react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const Result = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating project retrieval
    setTimeout(() => {
      const found = dummyGenerations.find((p) => p.id === projectId);
      setProject(found || null);
      setLoading(false);
    }, 800);
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2Icon className="size-10 animate-spin text-violet-500 mb-4" />
        <p className="text-gray-400 font-medium">Retrieving results...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <button
          onClick={() => navigate('/my-generations')}
          className="bg-white/10 px-6 py-2 rounded-lg hover:bg-white/20 transition"
        >
          Back to Generations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mb-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Main Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
              {project.generatedVideo ? (
                <video
                  src={project.generatedVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.generatedImage}
                  alt={project.productName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/20">
                <DownloadIcon className="size-5" />
                Download Asset
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors">
                <Share2Icon className="size-5" />
              </button>
            </div>
          </motion.div>

          {/* Details & Info */}
          <div className="space-y-12">
            <div>
              <Title
                heading={project.productName}
                description={`Generated using ${project.aspectRatio} aspect ratio`}
              />
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  {project.aspectRatio}
                </span>
                {project.isPublished && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                    Published
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Prompt Used</h4>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-gray-200 leading-relaxed italic">
                    "{project.userPrompt}"
                  </p>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Source Assets</h4>
                <div className="flex gap-4">
                  {project.uploadedImages.map((img, i) => (
                    <div key={i} className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                      <img src={img} alt="source" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLinkIcon className="size-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;