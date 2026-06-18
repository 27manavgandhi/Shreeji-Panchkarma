import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  treatment: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email, treatment, message } = parsed.data;

    // In production: send email via Nodemailer/Resend/SendGrid
    // For now, log and return success
    console.log("New consultation request:", {
      name,
      phone,
      email,
      treatment,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Add your email sending logic here
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'website@shreejipanchkarma.com',
    //   to: 'info@shreejipanchkarma.com',
    //   subject: `New Consultation Request from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Phone: ${phone}</p>...`
    // });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Dr. Sharma will contact you within 24 hours to schedule your free consultation.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly at +91 98765 43210." },
      { status: 500 }
    );
  }
}
