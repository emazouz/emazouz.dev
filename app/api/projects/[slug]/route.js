import Project from "@/models/Project";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    // الاتصال بقاعدة البيانات
    await mongooseConnect();

    // جلب بيانات المشروع باستخدام slug
    const project = await Project.findOne({ slug });

    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching project data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    // الاتصال بقاعدة البيانات
    await mongooseConnect();

    // قراءة بيانات الطلب
    const {
      title,
      slug,
      description,
      images,
      client,
      projectCategory,
      tags,
      livePreview,
      openSource,
      status,
    } = await req.json();

    // التحقق من الحقول المطلوبة
    if (!title || !slug || !description) {
      return new Response(
        JSON.stringify({ error: "Title, slug, and description are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // إنشاء مشروع جديد
    const newProject = new Project({
      title,
      slug,
      description,
      images,
      client,
      projectCategory,
      tags,
      livePreview,
      openSource,
      status,
    });

    await newProject.save();

    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
