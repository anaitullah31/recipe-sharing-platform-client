"use client";

import { authClient } from "@/app/lib/auth-client";
import { FileArrowUp } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const ProfileUpdateForm = ({ user }) => {
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [preview, setPreview] = useState(user?.image || "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        const uploadedUrl = data.data.url;

        setImage(uploadedUrl);
        setPreview(uploadedUrl);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Image upload failed",
        });
        setPreview(user?.image || "");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Image upload failed",
      });
      setPreview(user?.image || "");
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (uploading) {
      Swal.fire({
        icon: "error",
        title: "Image is uploading",
        text: "Image is still uploading. Please wait.",
      });
      return;
    }

    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Required field",
        text: "Name is required",
      });
      return;
    }

    try {
      setLoading(true);

      const updatedUser = {
        name: name.trim(),
        image,
      };

      const { error } = await authClient.updateUser(updatedUser);

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.message || "Profile update failed",
        });
        return;
      }

      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: updatedUser,
        }),
      );

      router.refresh();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonText: "Awesome",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Profile update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-8">
      <div className="border border-border bg-surface p-8">
        <h2 className="border-b border-separator pb-5 font-serif text-2xl">
          Account Settings
        </h2>

        <div className="mt-8 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-surface-secondary-foreground">
              Email Address
            </label>
            <input
              value={user?.email || ""}
              readOnly
              className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border border-border bg-surface p-8">
        <h2 className="border-b border-separator pb-5 font-serif text-2xl">
          Update Profile Image
        </h2>

        <label className="relative mt-8 flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-accent/40 bg-surface-secondary text-center">
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Profile Preview"
                fill
                unoptimized
                className="object-cover"
              />

              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                  Uploading image...
                </div>
              )}
            </>
          ) : (
            <>
              <Icon data={FileArrowUp} size={28} className="text-accent" />
              <p className="mt-4 text-sm text-surface-secondary-foreground">
                Drag and drop your profile photo here
              </p>
              <p className="mt-1 text-xs font-semibold text-foreground">
                Or click to browse
              </p>
            </>
          )}

          <input
            onChange={handleImageUpload}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>

        {image && (
          <p className="mt-3 break-all text-xs text-surface-secondary-foreground">
            Uploaded image ready.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="cursor-pointer bg-accent px-8 py-3 text-xs font-bold uppercase text-accent-foreground hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading
          ? "Uploading Image..."
          : loading
            ? "Saving..."
            : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
