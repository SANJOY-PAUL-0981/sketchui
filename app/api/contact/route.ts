import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactPayload = {
    name?: string
    email?: string
    message?: string
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactPayload

        const name = body.name?.trim()
        const email = body.email?.trim()
        const message = body.message?.trim()

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email and message are required." },
                { status: 400 }
            )
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            )
        }

        if (message.length < 10) {
            return NextResponse.json(
                { error: "Message should be at least 10 characters." },
                { status: 400 }
            )
        }

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: "RESEND_API_KEY is missing." },
                { status: 500 }
            )
        }

        const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL

        if (!receiverEmail) {
            return NextResponse.json(
                { error: "CONTACT_RECEIVER_EMAIL is missing." },
                { status: 500 }
            )
        }

        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")

        const { data, error } = await resend.emails.send({
            from: "Sanjoy Portfolio <contact@contact.sanjoydev.com>",
            to: [receiverEmail],
            replyTo: email,
            subject: `New portfolio message from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}

                Message:
                ${message}
            `,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
            <div style="max-width: 620px; margin: 0 auto; border: 2px solid #111; border-radius: 18px; padding: 24px; background: #fffbf2;">
            <h2 style="margin: 0 0 16px; font-size: 24px;">SketchUI feedback message.</h2>

            <p style="margin: 0 0 8px;">
              <strong>Name:</strong> ${safeName}
            </p>

            <p style="margin: 0 0 16px;">
              <strong>Email:</strong> ${safeEmail}
            </p>

            <hr style="border: none; border-top: 2px dashed #111; margin: 18px 0;" />

            <p style="margin: 0 0 8px;">
              <strong>Message:</strong>
            </p>

            <p style="margin: 0; white-space: normal;">
              ${safeMessage}
            </p>
            </div>
            </div>
        `,
        })

        if (error) {
            console.error("Resend error:", error)

            return NextResponse.json(
                { error: error.message || "Failed to send message." },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully.",
                id: data?.id,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Contact API error:", error)

        return NextResponse.json(
            { error: "Something went wrong while sending the message." },
            { status: 500 }
        )
    }
}