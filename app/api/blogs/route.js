// app/api/blogs/route.js
import Blog from "../../../models/Blog";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET(req) {
  await mongooseConnect();

  const method = req.method;

  try {
    if (method === "GET") {
      if (req.query?.id) {
        // البحث عن المدونة باستخدام ID
        const blog = await Blog.findById(req.query.id);
        if (blog) {
          return new Response(JSON.stringify(blog), { status: 200 });
        }
        return new Response(JSON.stringify({ message: "Blog not found" }), {
          status: 404,
        });
      }

      if (req.query?.blogCategory) {
        // البحث عن المدونات باستخدام الفئة
        const blogs = await Blog.find({
          blogCategory: req.query.blogCategory,
        });
        return new Response(JSON.stringify(blogs), { status: 200 });
      }

      if (req.query?.slug) {
        // البحث عن المدونات باستخدام slug
        const blogs = await Blog.find({ slug: req.query.slug }).sort({
          createdAt: -1,
        });
        return new Response(JSON.stringify(blogs), { status: 200 });
      }

      // جلب جميع المدونات
      const blogs = await Blog.find().sort({ createdAt: -1 });
      return new Response(JSON.stringify(blogs), { status: 200 });
    }

    // طرق غير مدعومة
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
    });
  } catch (error) {
    // معالجة الأخطاء
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
