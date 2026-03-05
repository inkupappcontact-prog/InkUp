import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getWelcomeEmailHtml, getWelcomeEmailText } from "../utils/email-templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailData {
  user_email: string;
  user_name: string;
  user_role: string;
  artist_name?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the request body
    const { user_email, user_name, user_role, artist_name }: WelcomeEmailData = await req.json();

    if (!user_email || !user_name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: user_email, user_name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate email content
    const emailHtml = getWelcomeEmailHtml(user_name);
    const emailText = getWelcomeEmailText(user_name);

    // Send email using Supabase Auth Admin API
    const { error } = await supabaseClient.auth.admin.invokeEmailAction({
      type: "signup",
      email: user_email,
      data: {
        user_name,
        user_role,
        artist_name,
        email_html: emailHtml,
        email_text: emailText,
      },
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send welcome email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in welcome email function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
