import { mongooseConnect } from "@/lib/mongoose";
import Comment from "../../../models/Comment";

// دالة لإنشاء تعليق جديد
export async function POST(req) {
  try {
    await mongooseConnect();

    const {
      name,
      email,
      title,
      contentpera,
      parent,
      mainComment,
      theMainComment,
    } = await req.json();

    let commentDoc;

    if (parent) {
      // إنشاء تعليق جديد كرد على تعليق آخر
      commentDoc = await Comment.create({
        name,
        email,
        title,
        contentpera,
        mainComment, // إرسال mainComment كـ false
        theMainComment,
        parent,
      });

      // تحديث التعليق الأب لإضافة معرف التعليق الجديد
      await Comment.findByIdAndUpdate(parent, {
        $push: { children: commentDoc._id },
      });
    } else {
      // إنشاء تعليق جديد بدون والد
      commentDoc = await Comment.create({
        name,
        email,
        title,
        contentpera,
        mainComment, //
        theMainComment, //  إرسال mainComment كـ true
      });
    }

    return new Response(JSON.stringify(commentDoc), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create comment",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// دالة GET
export async function GET(req) {
  return new Response(
    JSON.stringify({ message: "GET method not supported here." }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const { name, email, title, contentpera } = await req.json();

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, title, contentpera },
      { new: true }
    );

    if (!updatedComment) {
      return new Response(JSON.stringify({ error: "Comment not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedComment), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
