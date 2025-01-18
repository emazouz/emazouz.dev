// app/api/photos/route.js
import { mongooseConnect } from "@/lib/mongoose";
import Photo from "../../../models/Photo";

export async function GET(req) {
  await mongooseConnect();

  try {
    const { searchParams } = new URL(req.url); // استخراج الـ query parameters
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      // البحث عن الصورة باستخدام ID
      const photo = await Photo.findById(id);
      if (photo) {
        return new Response(JSON.stringify(photo), { status: 200 });
      }
      return new Response(JSON.stringify({ message: "Photo not found" }), {
        status: 404,
      });
    }

    if (slug) {
      // البحث عن الصور باستخدام slug
      const photos = await Photo.find({ slug }).sort({ createdAt: -1 });
      if (photos.length > 0) {
        return new Response(JSON.stringify(photos), { status: 200 });
      }
      return new Response(
        JSON.stringify({ message: "No photos found with this slug" }),
        { status: 404 }
      );
    }

    // جلب جميع الصور
    const photos = await Photo.find().sort({ createdAt: -1 });
    if (photos.length > 0) {
      return new Response(JSON.stringify(photos), { status: 200 });
    }
    return new Response(JSON.stringify({ message: "No photos found" }), {
      status: 404,
    });
  } catch (error) {
    // خطأ داخلي
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        // error: error.message,
      }),
      { status: 500 }
    );
  }
}
