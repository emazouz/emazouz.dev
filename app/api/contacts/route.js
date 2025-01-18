import { mongooseConnect } from "@/lib/mongoose";
import Contact from "../../../models/contact";

// دالة لإنشاء تعليق جديد
export async function POST(req) {
  try {
    // الاتصال بقاعدة البيانات
    await mongooseConnect();

    // استخراج البيانات من الجسم
    const {
      name,
      lname,
      email,
      company,
      phone,
      country,
      price,
      description,
      project,
    } = await req.json();

    // التحقق من صحة البيانات
    if (!name || !lname || !email || !company || !phone || !country || !price || !description || !project) {
      return new Response(
        JSON.stringify({
          error: "All fields are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // إنشاء مستند جديد
    const contactDoc = await Contact.create({
      name,
      lname,
      email,
      company,
      phone,
      country,
      price,
      description,
      project,
    });

    return new Response(JSON.stringify(contactDoc), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create contact",
        // details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
