import { useState } from "react";
import Title from "../components/Title";
import UploadZone from "../components/UploadZone";
import {
  Image as ImageIcon,
  RectangleVerticalIcon,
  RectangleHorizontalIcon,
  Loader2Icon,
  Wand2Icon,
} from "lucide-react";
import { PrimaryButton } from "../components/Buttons";

const Generator = () => {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "product" | "model"
  ) => {
    if (e.target.files && e.target.files[0]) {
      type === "product"
        ? setProductImage(e.target.files[0])
        : setModelImage(e.target.files[0]);
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productImage) return;

    setIsGenerating(true);

    console.log({
      name,
      productName,
      productDescription,
      aspectRatio,
      productImage,
      modelImage,
      userPrompt,
    });

    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen text-white px-6 md:px-12 pt-32">
      <form onSubmit={handleGenerate} className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-20">
          <Title
            heading="Create In-context AI Images"
            description="Transform your product photos into professional lifestyle shots using our advanced AI engine."
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LEFT COLUMN – Uploads */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-violet-400 mb-4">
                <ImageIcon className="w-5 h-5" />
                <h3 className="font-medium font-bold uppercase tracking-widest text-[10px]">Step 1: Assets</h3>
              </div>

              <div className="flex flex-col gap-6">
                <UploadZone
                  label="Product Photo"
                  file={productImage}
                  onClear={() => setProductImage(null)}
                  onChange={(e) => handleFileChange(e, "product")}
                />

                <UploadZone
                  label="Model/Context (Optional)"
                  file={modelImage}
                  onClear={() => setModelImage(null)}
                  onChange={(e) => handleFileChange(e, "model")}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – Configuration */}
          <div className="lg:col-span-8 flex flex-col gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">

            <div className="flex items-center gap-2 text-violet-400">
              <Wand2Icon className="w-5 h-5" />
              <h3 className="font-bold uppercase tracking-widest text-[10px]">Step 2: Scene Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Collection 2024"
                  required
                  className="w-full bg-white/5 rounded-xl border border-white/10 p-4 text-sm focus:border-violet-500/50 outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Product Identifier
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Minimalist Gold Watch"
                  required
                  className="w-full bg-white/5 rounded-xl border border-white/10 p-4 text-sm focus:border-violet-500/50 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Contextual Description
              </label>
              <textarea
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Mention key materials, colors, or vibes..."
                className="w-full bg-white/5 rounded-xl border border-white/10 p-4 text-sm resize-none focus:border-violet-500/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Target Platform / Ratio
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAspectRatio("9:16")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all border ${aspectRatio === "9:16"
                      ? "bg-violet-500/10 border-violet-500 text-white shadow-lg shadow-violet-500/10"
                      : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                    }`}
                >
                  <RectangleVerticalIcon className="size-6" />
                  <span className="text-[10px] font-bold uppercase">Vertical (9:16)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio("16:9")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all border ${aspectRatio === "16:9"
                      ? "bg-violet-500/10 border-violet-500 text-white shadow-lg shadow-violet-500/10"
                      : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                    }`}
                >
                  <RectangleHorizontalIcon className="size-6" />
                  <span className="text-[10px] font-bold uppercase">Landscape (16:9)</span>
                </button>
              </div>
            </div>

            {/* User Prompt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                AI Directive / Custom Scene (Optional)
              </label>
              <textarea
                rows={3}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="e.g. 'In a luxury marble bathroom with cinematic morning light...'"
                className="w-full bg-white/5 rounded-xl border border-white/10 p-4 text-sm resize-none focus:border-violet-500/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mt-12 mb-24">
          <PrimaryButton
            disabled={isGenerating || !productImage}
            className="px-12 py-4 rounded-full flex items-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-10 group-hover:opacity-20 transition-opacity" />
            {isGenerating ? (
              <>
                <Loader2Icon className="size-5 animate-spin" />
                <span className="font-bold tracking-widest uppercase text-sm">Synthesizing...</span>
              </>
            ) : (
              <>
                <Wand2Icon className="size-5 group-hover:rotate-12 transition-transform" />
                <span className="font-bold tracking-widest uppercase text-sm">Generate Asset</span>
              </>
            )}
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
};

export default Generator;
