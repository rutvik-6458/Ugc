import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { Loader2Icon, Share2Icon, DownloadIcon, EllipsisIcon, ImageIcon, PlaySquareIcon, Trash2Icon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { GhostButton, PrimaryButton } from "./Buttons";

// interface ProjectCardProps {
//     gen: Project;
//     forCommunity?: boolean;
//     setGenerations: (generations: Project[]) => void;
// }

const ProjectCard = ({ gen, setGenerations, forCommunity = false }: { gen: Project, setGenerations: React.Dispatch<React.SetStateAction<Project[]>>, forCommunity?: boolean }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this project ?')
        if (!confirm) return;
        console.log(id)
    }

    const togglePublish = async (projectId: string) => {

        console.log(projectId)
    }

    return (
        <div className="mb-6 break-inside-avoid group/card">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 group shadow-lg hover:shadow-violet-500/10">

                {/* Preview Container */}
                <div
                    className={`relative overflow-hidden cursor-pointer ${gen?.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
                        }`}
                    onClick={() => navigate(`/result/${gen.id}`)}
                >
                    {gen.generatedImage && (
                        <img
                            src={gen.generatedImage}
                            alt={gen.productName}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${gen.generatedVideo ? "group-hover:opacity-0" : "group-hover:scale-110"
                                }`}
                        />
                    )}

                    {gen.generatedVideo && (
                        <video
                            src={gen.generatedVideo}
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                        />
                    )}

                    {(!gen.generatedImage && !gen.generatedVideo) && (
                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                            <Loader2Icon className="size-8 animate-spin text-violet-400" />
                            <p className="mt-2 text-xs font-medium text-violet-300">Generating...</p>
                        </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2 items-center">
                        {gen.isGenerating && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full backdrop-blur-md">
                                Generating
                            </span>
                        )}
                        {gen.isPublished && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full backdrop-blur-md">
                                Community
                            </span>
                        )}
                    </div>

                    {/* {action menu for my genretion only} */}

                    {!forCommunity && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">

                            {/* Trigger */}
                            <button
                                type="button"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                className="bg-black/20 rounded-full p-1 size-7 cursor-pointer flex items-center justify-center"
                            >
                                <EllipsisIcon size={18} />
                            </button>

                            {/* Dropdown */}
                            {menuOpen && (
                                <div
                                    onMouseLeave={() => setMenuOpen(false)}
                                    className="absolute right-0 mt-2 w-40 bg-black/60 backdrop-blur border border-gray-500/50 rounded-lg shadow-md z-20"
                                >
                                    <ul className="py-1 text-xs text-white">
                                        {gen.generatedImage && (
                                            <li>
                                                <a
                                                    href='#'
                                                    download
                                                    className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 transition cursor-pointer"
                                                >
                                                    <ImageIcon size={14} />
                                                    Download Image
                                                </a>
                                            </li>
                                        )}

                                        {gen.generatedVideo && (
                                            <li>
                                                <a
                                                    href='#'
                                                    download
                                                    className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 transition cursor-pointer"
                                                >
                                                    <PlaySquareIcon size={14} />
                                                    Download Video
                                                </a>
                                            </li>
                                        )}

                                        {(gen.generatedVideo || gen.generatedImage) && <button onClick={() => navigator.share({ url: gen.generatedVideo || gen.generatedImage, title: gen.productName, text: gen.productDescription })} className="w-full flex gap-2 items-center px-4 py-2 hover:bg-black/10 cursor-pointer">
                                            <Share2Icon size={14} />
                                            Share
                                        </button>}

                                        <button onClick={() => handleDelete(gen.id)} className="w-full flex gap-2 items-center px-4 py-2 hover:bg-red-950/10 text-red-400 cursor-pointer">
                                            <Trash2Icon size={14} /> Delete
                                        </button>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}



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
                <div className="p-4 bg-white/5 border-t border-white/10">
                    <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors truncate">
                        {gen.productName}
                    </h3>
                    <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
                        <p className="text-[10px] text-gray-400">
                            Created: {new Date(gen.createdAt).toLocaleString(undefined, { day: '2-digit', month: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                        </p>
                        <span className="text-[10px] text-gray-400 font-medium">
                            Aspect: {gen.aspectRatio}
                        </span>
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

                    {/* {buttons} */}
                    {!forCommunity && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <GhostButton className="text-xs justify-center" onClick={()=>{navigate(`/result/${gen.id}`); scrollTo(0,0)}}>
                                View Details

                            </GhostButton>
                            <PrimaryButton onClick={()=> togglePublish(gen.id)} className="rounded-md">
                            {gen.isPublished ? 'Unpublish' : 'Publish'}
                            </PrimaryButton>
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
