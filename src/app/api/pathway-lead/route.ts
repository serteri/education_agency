import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        // Init inside the handler so it doesn't fail globally during static build if env var is missing
        const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');
        const body = await req.json();
        const { name, email, phone, locale, pdfBase64, firstStepData } = body;

        if (!name || !email || !pdfBase64) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Immediate Email with PDF attachment
        const immediateSubject = locale === 'tr'
            ? 'EduBrisbane: Özel Eğitim Yol Haritanız'
            : 'EduBrisbane: Your Custom Education Pathway';

        const immediateHtml = locale === 'tr'
            ? `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E3A5F;">
                    <h2>Merhaba ${name},</h2>
                    <p>EduBrisbane web sitemiz üzerinden oluşturduğunuz Özel Eğitim Yol Haritanız ektedir.</p>
                    <p>Ayrıca yerel destek hizmetlerimizi detaylıca anlatan "On-ground Support" rehberimizi de PDF içerisinde bulabilirsiniz.</p>
                    <p>Bu planı hayata geçirmek ve kabul şartlarını görüşmek isterseniz, bana bu e-postaya yanıt vererek veya <b>${phone}</b> numaranız üzerinden ulaşacağım WhatsApp mesajıyla iletişime geçebilirsiniz.</p>
                    <br/>
                    <p>Sevgiler,</p>
                    <p><b>Serter</b><br/>EduBrisbane</p>
                </div>
            `
            : `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E3A5F;">
                    <h2>Hi ${name},</h2>
                    <p>Attached is your Custom Education Pathway generated on the EduBrisbane website.</p>
                    <p>You'll also find our exclusive "On-ground Support" guide included in the PDF.</p>
                    <p>If you're ready to bring this plan to life and discuss entry requirements, you can reply directly to this email or expect a message on WhatsApp at <b>${phone}</b>.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p><b>Serter</b><br/>EduBrisbane</p>
                </div>
            `;

        await resend.emails.send({
            from: 'EduBrisbane <hello@edubrisbane.com>',
            to: [email],
            subject: immediateSubject,
            html: immediateHtml,
            attachments: [
                {
                    filename: 'EduBrisbane_PathwayPlanner.pdf',
                    content: pdfBase64.split(',')[1], // remove the data:application/pdf;base64, prefix
                }
            ]
        });

        // 2. Scheduled Follow-up Email (24 hours later)
        // If Resend API supports scheduling directly, use scheduledAt. Note: Scheduled emails require a paid Resend plan or active domain. We'll add the parameter if we want it, but if it fails on free tier, just send normal or omit.
        // For the sake of the task, we will try to schedule it.
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const followUpSubject = locale === 'tr'
            ? 'Yol haritanızdaki ilk adım için hazır mısınız?'
            : 'Ready for the first step in your pathway?';

        const followUpHtml = locale === 'tr'
            ? `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E3A5F;">
                    <h2>Merhaba ${name},</h2>
                    <p>Dün oluşturduğunuz yol haritasını inceleme fırsatınız oldu mu?</p>
                    <p>Özellikle haritanızdaki ilk adım olan <b>${firstStepData}</b> programı için kontenjanlar ve başvuru tarihleri hakkında görüşmek isterseniz size memnuniyetle yardımcı olabilirim.</p>
                    <p>Uygun olduğunuzda haberleşelim!</p>
                    <br/>
                    <p>Serter</p>
                </div>
            `
            : `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E3A5F;">
                    <h2>Hi ${name},</h2>
                    <p>Did you get a chance to review the roadmap you created yesterday?</p>
                    <p>I would be happy to help you navigate the application dates and availability, especially for the first step on your roadmap: <b>${firstStepData}</b>.</p>
                    <p>Let me know when you're available for a quick chat!</p>
                    <br/>
                    <p>Serter</p>
                </div>
            `;

        // Assuming Resend Pro or similar for scheduling. If error occurs on free tier, we would catch it.
        try {
            await resend.emails.send({
                from: 'Serter from EduBrisbane <serter@edubrisbane.com>',
                to: [email],
                subject: followUpSubject,
                html: followUpHtml,
                scheduledAt: tomorrow.toISOString(),
            });
        } catch (scheduleError) {
            console.error('Failed to schedule follow-up, might require upgraded Resend plan:', scheduleError);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error generating pathway lead:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
