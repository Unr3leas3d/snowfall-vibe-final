import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const signupSchema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = signupSchema.parse(body);

        const supabase = await createClient();

        // Insert into email_signups table
        const { error } = await supabase
            .from("email_signups")
            .insert({ email } as any);

        if (error) {
            // Check for unique constraint violation (already signed up)
            if (error.code === "23505") {
                return NextResponse.json(
                    { message: "You're already on the list!" },
                    { status: 200 }
                );
            }
            throw error;
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
