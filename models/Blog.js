import mongoose, { Schema, models, model } from "mongoose";

// تعريف مخطط المدونة
const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String, required: true }, // تصحيح كتابة require إلى required
    images: [{ type: String }],
    description: { type: String },
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    overview: { type: String },
    authorsName: [{ type: String }],
    authorsImg: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // تعريف الحقل بشكل صحيح
  },
  { timestamps: true } // تفعيل timestamps لإضافة createdAt و updatedAt
);

// تصدير النموذج
export default models.Blog || model("Blog", BlogSchema, "Blogs");
