import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import { mongooseConnect } from "@/lib/mongoose";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    // الاتصال بقاعدة البيانات
    await mongooseConnect();

    // جلب بيانات المدونة باستخدام slug
    const blog = await Blog.findOne({ slug }).populate("comments");

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    // جلب التعليقات المرتبطة بالمدونة وترتيبها
    const comments = await Comment.find({ blog: blog._id }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify({ blog, comments }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req, { params }) {
  const { slug } = params;

  try {
    // الاتصال بقاعدة البيانات
    await mongooseConnect();

    // جلب بيانات المدونة باستخدام slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    // قراءة بيانات الطلب
    const { name, email, title, contentpera, parent } = await req.json();

    if (!name || !email || !title || !contentpera) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    // إنشاء تعليق جديد
    const newComment = new Comment({
      name,
      email,
      title,
      contentpera,
      blog: blog._id,
      parent: parent || null,
      parentName: parent ? (await Comment.findById(parent)).name : null,
      mainComment: !parent,
    });

    await newComment.save();

    // تحديث التعليق الأب إذا كان موجودًا
    if (parent) {
      const parentComment = await Comment.findById(parent);
      if (!parentComment) {
        return new Response(
          JSON.stringify({ error: "Parent comment not found" }),
          { status: 404 }
        );
      }

      parentComment.children.push(newComment._id);
      await parentComment.save();
    }

    return new Response(JSON.stringify(newComment), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}