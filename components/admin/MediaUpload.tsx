"use client";

import { useRef, useState } from "react";
import { Upload, X, Film, ImageIcon, Loader2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Props {
  images: string[];
  video: string;
  onImagesChange: (urls: string[]) => void;
  onVideoChange: (url: string) => void;
}

const MAX_IMAGES = 5;
const BUCKET = "products";

async function uploadToStorage(
  supabase: ReturnType<typeof createClient>,
  file: File,
  folder: "images" | "videos"
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function MediaUpload({ images, video, onImagesChange, onVideoChange }: Props) {
  const supabase = createClient();
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const videoInputRef = useRef<HTMLInputElement>(null);

  async function handleImageFile(slotIndex: number, file: File) {
    setUploadingSlot(slotIndex);
    try {
      const url = await uploadToStorage(supabase, file, "images");
      const next = [...images];
      if (slotIndex < next.length) {
        next[slotIndex] = url;
      } else {
        next.push(url);
      }
      onImagesChange(next);
    } catch (e: any) {
      toast.error("Image upload failed: " + e.message);
    } finally {
      setUploadingSlot(null);
    }
  }

  async function handleVideoFile(file: File) {
    setUploadingVideo(true);
    try {
      const url = await uploadToStorage(supabase, file, "videos");
      onVideoChange(url);
    } catch (e: any) {
      toast.error("Video upload failed: " + e.message);
    } finally {
      setUploadingVideo(false);
    }
  }

  function removeImage(index: number) {
    onImagesChange(images.filter((_, i) => i !== index));
  }

  // Always show filled slots + one empty slot (up to MAX_IMAGES)
  const slotCount = Math.min(images.length + 1, MAX_IMAGES);

  return (
    <div className="space-y-5">
      {/* ── Images ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images{" "}
          <span className="text-gray-400 font-normal">
            ({images.length}/{MAX_IMAGES} — first image is the main photo)
          </span>
        </label>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: MAX_IMAGES }).map((_, slotIndex) => {
            const url = images[slotIndex] ?? null;
            const isLoading = uploadingSlot === slotIndex;
            const isLocked = slotIndex > images.length; // can't skip slots

            return (
              <div key={slotIndex} className="relative aspect-square">
                <input
                  ref={(el) => { imageInputRefs.current[slotIndex] = el; }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageFile(slotIndex, file);
                    e.target.value = "";
                  }}
                />

                {url ? (
                  /* Filled slot */
                  <div className="group relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-200">
                    <img src={url} alt={`Product image ${slotIndex + 1}`} className="w-full h-full object-cover" />
                    {slotIndex === 0 && (
                      <span className="absolute top-1 left-1 bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                        MAIN
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        title="Replace image"
                        onClick={() => imageInputRefs.current[slotIndex]?.click()}
                        className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Upload size={12} />
                      </button>
                      <button
                        type="button"
                        title="Remove image"
                        onClick={() => removeImage(slotIndex)}
                        className="p-1.5 bg-white rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty slot */
                  <button
                    type="button"
                    disabled={isLocked || isLoading}
                    onClick={() => imageInputRefs.current[slotIndex]?.click()}
                    className="w-full h-full rounded-xl border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50/50 transition-colors flex flex-col items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin text-yellow-500" />
                    ) : (
                      <>
                        <Plus size={18} className="text-gray-300" />
                        <span className="text-[10px] text-gray-400">
                          {slotIndex === 0 ? "Main" : `Photo ${slotIndex + 1}`}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WebP supported. Add images in order — you can't skip slots.</p>
      </div>

      {/* ── Video ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Video <span className="text-gray-400 font-normal">(optional)</span>
        </label>

        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleVideoFile(file);
            e.target.value = "";
          }}
        />

        {video ? (
          <div className="flex items-center gap-3 border-2 border-yellow-400 bg-yellow-50 rounded-xl px-4 py-3">
            <Film size={20} className="text-yellow-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate flex-1 font-mono">
              {video.split("/").pop()}
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                title="Replace video"
                onClick={() => videoInputRef.current?.click()}
                className="p-1.5 hover:bg-yellow-100 rounded-lg transition-colors text-gray-600"
              >
                <Upload size={14} />
              </button>
              <button
                type="button"
                title="Remove video"
                onClick={() => onVideoChange("")}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50/50 transition-colors py-6 flex flex-col items-center gap-2"
          >
            {uploadingVideo ? (
              <>
                <Loader2 size={24} className="animate-spin text-yellow-500" />
                <span className="text-sm text-gray-500">Uploading video...</span>
              </>
            ) : (
              <>
                <Film size={24} className="text-gray-300" />
                <span className="text-sm text-gray-500">Click to upload a product video</span>
                <span className="text-xs text-gray-400">MP4, WebM, MOV — max recommended 50 MB</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
