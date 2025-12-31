import { apiFetch } from "@/lib/adminClient";

// Upload skill image to Cloudinary and return the URL
export async function uploadSkillImage(
  file: File,
  folder = "skills"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await apiFetch<{ url: string }>("/api/upload", {
    method: "POST",
    auth: true,
    body: formData,
  });

  return res.url;
}

// Upload projects image to Cloudinary and return the URL
export async function uploadProjectImage(
    file: File,
    folder = "projects"
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await apiFetch<{ url: string }>("/api/upload", {
      method: "POST",
      auth: true,
      body: formData,
    });
    
    return res.url;
  }