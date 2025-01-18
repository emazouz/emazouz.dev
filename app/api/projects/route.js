import { mongooseConnect } from "@/lib/mongoose";
import Project from "../../../models/Project";

export async function GET(req) {
  await mongooseConnect();

  const method = req.method;

  try {
    if (method === "GET") {
      if (req.query?.id) {
        // البحث عن المدونة باستخدام ID
        const project = await Project.findById(req.query.id);
        if (project) {
          return new Response(JSON.stringify(project), { status: 200 });
        }
        return new Response(JSON.stringify({ message: "Project not found" }), {
          status: 404,
        });
      }

      if (req.query?.projectCategory) {
        // البحث عن المدونات باستخدام الفئة
        const projects = await Project.find({
          projectCategory: req.query.projectCategory,
        });
        return new Response(JSON.stringify(projects), { status: 200 });
      }

      if (req.query?.slug) {
        // البحث عن المدونات باستخدام slug
        const projects = await Project.find({ slug: req.query.slug }).sort({
          createdAt: -1,
        });
        return new Response(JSON.stringify(projects), { status: 200 });
      }

      // جلب جميع المدونات
      const projects = await Project.find().sort({ createdAt: -1 });
      return new Response(JSON.stringify(projects), { status: 200 });
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
