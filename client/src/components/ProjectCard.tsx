import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { Loader2Icon, Share2Icon, DownloadIcon } from "lucide-react";

interface ProjectCardProps {
    gen: Project;
    forCommunity?: boolean;
}

const ProjectCard = ({ gen, forCommunity = false }: ProjectCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6 break-inside-avoid group/card">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 group shadow-lg hover:shadow-violet-500/10">

                {/* Preview Container */}
                <div
                    className={`relative overflow-hidden cursor-pointer ${gen?.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
                        }`}
                    onClick={() => navigate(`/result/${gen.id}`)}
                >
                    {gen.genratedImage && (
                        <img
                            src={gen.genratedImage}
                            alt={gen.productName}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${gen.genratedVideo ? "group-hover:opacity-0" : "group-hover:scale-110"
                                }`}
                        />
                    )}

                    {gen.genratedVideo && (
                        <video
                            src={gen.genratedVideo}
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                        />
                    )}

                    {(!gen.genratedImage && !gen.genratedVideo) && (
                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                            <Loader2Icon className="size-8 animate-spin text-violet-400" />
                            <p className="mt-2 text-xs font-medium text-violet-300">Generating...</p>
                        </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2 items-center">
                        {gen.isGenerating && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full backdrop-blur-md">
                                Generating
                            </span>
                        )}
                        {gen.isPublished && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full backdrop-blur-md">
                                Community
                            </span>
                        )}
                    </div>

                    {/* Source Images Bubbles */}
                    <div className="absolute right-3 bottom-3 flex -space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        {gen.uploadedImages?.slice(0, 2).map((img, idx) => (
                            <div
                                key={idx}
                                className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-black animate-float ring-4 ring-black/20"
                                style={{ animationDelay: `${idx * 1.5}s` }}
                            >
                                <img src={img} alt="source" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors">
                            <Share2Icon className="size-4" />
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors">
                            <DownloadIcon className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-4 bg-white/[0.02]">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0 pr-4">
                            <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors truncate">
                                {gen.productName}
                            </h3>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight">
                                {new Date(gen.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-400 font-medium">
                                {gen.aspectRatio}
                            </span>
                        </div>
                    </div>

                    {gen.productDescription && (
                        <div className="mt-3">
                            <p className="text-[11px] font-medium text-violet-400 mb-1">Description</p>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed italic">
                                "{gen.productDescription}"
                            </p>
                        </div>
                    )}

                    {gen.userPrompt && (
                        <div className="mt-3 p-2 bg-black/20 rounded-lg border border-white/5">
                            <p className="text-[11px] font-medium text-gray-500 mb-1">Prompt</p>
                            <p className="text-xs text-gray-300 line-clamp-1 break-words">
                                {gen.userPrompt}
                            </p>
                        </div>
                    )}

                    {forCommunity && gen.user && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-[10px] font-bold text-violet-400 border border-violet-500/20">
                                {gen.user.name?.charAt(0) || "U"}
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{gen.user.name || "Anonymous"}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;