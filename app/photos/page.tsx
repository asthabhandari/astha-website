// This file is a server component. Node.js APIs are allowed here.
import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";

export const metadata: Metadata = {
  title: "Photos",
  description: "My Photos",
};

async function getPhotoImages() {
  const fs = (await import("fs")).default;
  const path = (await import("path")).default;
  const photosDir = path.join(process.cwd(), "public", "photos");
  const files = fs.readdirSync(photosDir);
  // Only include image files (jpg, jpeg, png, gif, webp)
  return files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)).map((file) => ({
    src: `/photos/${file}`,
    alt: file,
  }));
}

export default async function Photos() {
  const images = await getPhotoImages();
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Photos</h1>
      <ImageGrid columns={3} images={images} />
    </section>
  );
}
