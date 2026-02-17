import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import {
  Loader2Icon,
  ArrowLeftIcon,
  DownloadIcon,
  Share2Icon,
  ExternalLinkIcon,
  ImageIcon,
  VideoIcon,
  SparklesIcon,
  BanIcon,
} from "lucide-react";
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

  const hasVideo = Boolean(project?.generatedVideo);
  const imageUrl = project?.generatedImage;

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${project?.productName ?? "ugc"}-image.png`;
    link.click();
  };

  const handleDownloadVideo = () => {
    if (!project?.generatedVideo) return;
    const link = document.createElement("a");
    link.href = project.generatedVideo;
    link.download = `${project?.productName ?? "ugc"}-video.mp4`;
    link.click();
  };

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
              <button
                onClick={hasVideo ? handleDownloadVideo : handleDownloadImage}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/20"
              >
                <DownloadIcon className="size-5" />
                Download {hasVideo ? 'Video' : 'Image'}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: project.productName,
                      text: project.productDescription,
                      url: hasVideo ? project.generatedVideo : project.generatedImage
                    });
                  }
                }}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
              >
                <Share2Icon className="size-5" />
              </button>
            </div>
          </motion.div>

          {/* Details & Info */}
          <div className="space-y-6">
            {/* Actions card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadImage}
                  disabled={!imageUrl}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-gray-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ImageIcon className="size-5" />
                  Download Image
                </button>
                <button
                  onClick={handleDownloadVideo}
                  disabled={!hasVideo}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-gray-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                >
                  <span className="relative inline-flex">
                    <VideoIcon className="size-5" />
                    {!hasVideo && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <BanIcon className="size-4 text-red-500 stroke-[2.5]" />
                      </span>
                    )}
                  </span>
                  Download Video
                </button>
              </div>
            </div>

            {/* Video Magic card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/5 pointer-events-none">
                <VideoIcon className="size-32" strokeWidth={1} />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Video Magic</h2>
              <p className="text-xs text-gray-400 mb-6 max-w-[200px] leading-relaxed">
                Turn this static image into a dynamic video for social media.
              </p>
              {hasVideo ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold shadow-inner">
                  Video Generated Successfully!
                </div>
              ) : (
                <button
                  onClick={() => navigate("/generate")}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold transition-all shadow-lg shadow-violet-600/20"
                >
                  <SparklesIcon className="size-5" />
                  Generate Video
                </button>
              )}
            </div>

            <div className="space-y-12 pt-4">
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
    </div>
  );
};

export default Result;