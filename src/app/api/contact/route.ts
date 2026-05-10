import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend initialization
// Make sure to add RESEND_API_KEY to your .env.local file.
const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, location, destinationCity, startTerm, educationLevel, englishLevel, currentSchool, desiredCourse, note } = body;

        // Basic validation
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Email to EduBrisbane Team (Admin Notification)
        const adminHtml = `
            <h2>New Student Inquiry - EduBrisbane</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Current Location:</strong> ${location || 'N/A'}</p>
            <hr />
            <h3>Study Preferences</h3>
            <p><strong>Target City:</strong> ${destinationCity || 'N/A'}</p>
            <p><strong>Starting Term:</strong> ${startTerm || 'N/A'}</p>
            <p><strong>Edu Level:</strong> ${educationLevel || 'N/A'}</p>
            <p><strong>English Level:</strong> ${englishLevel || 'N/A'}</p>
            <p><strong>Current School:</strong> ${currentSchool || 'N/A'}</p>
            <p><strong>Desired Course:</strong> ${desiredCourse || 'N/A'}</p>
            <br/>
            <p><strong>Additional Notes:</strong><br/>${note || 'N/A'}</p>
        `;

        // 2. Email to Student (Auto-responder)
        const studentHtml = `
            <div style="font-family: Arial, sans-serif; color: #0A192F; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #0A192F; padding: 24px; text-align: center;">
                    <h1 style="color: white; margin: 0;">EduBrisbane</h1>
                </div>
                <div style="padding: 32px;">
                    <h2 style="margin-top: 0; color: #0A192F;">Hello ${firstName},</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                        Thank you for reaching out to EduBrisbane! We have successfully received your inquiry for studying in Australia.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                        Our specialised education consultants in Brisbane will review your details (including your interest in ${destinationCity || 'Australia'}) and will get back to you shortly via phone or email to discuss the best pathways for your future.
                    </p>
                    <div style="margin-top: 32px; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
                        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Next Steps</h3>
                        <p style="margin: 0; font-size: 15px; color: #4b5563;">Keep an eye on your inbox (and spam folder) for our response. In the meantime, feel free to browse our catalogue of Language Schools, TAFEs, and Universities.</p>
                    </div>
                </div>
                <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">
                        EduBrisbane | Albion, Brisbane QLD 4010, Australia<br/>
                        &copy; ${new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        `;

        // We use Promise.all to send both emails concurrently.
        // Replace 'noreply@edubrisbane.com' and 'info@edubrisbane.com' with your actual verified sender domains on Resend.
        const [adminResult, studentResult] = await Promise.all([
            resend.emails.send({
                from: "EduBrisbane Web <onboarding@resend.dev>", // TODO: Update to your verified domain e.g. 'noreply@yourdomain.com'
                to: ["hello@edubrisbane.com.au"], // Put the actual agent email here, fallback to a dummy if needed
                subject: `New Lead: ${firstName} ${lastName} - ${destinationCity || 'Australia'}`,
                html: adminHtml,
            }),
            resend.emails.send({
                from: "EduBrisbane Team <onboarding@resend.dev>", // TODO: Update to your verified domain
                to: [email],
                subject: "Thank you for contacting EduBrisbane! 🎓",
                html: studentHtml,
            })
        ]);

        if (adminResult.error) {
            console.error("Resend Admin Error:", adminResult.error);
            return NextResponse.json({ error: adminResult.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Emails sent successfully." });

    } catch (error: any) {
        console.error("Contact API Server Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
