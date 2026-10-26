import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://hfpysllpncjqyqdtsrvs.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_r8yDC9a-CJpAudpUl9EGUQ_G8UKe4Cj";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Save event registration or interest notification to Supabase
 */
export async function saveRegistration(payload) {
  try {
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          email: payload.email,
          name: payload.name || null,
          phone: payload.phone || null,
          college: payload.college || null,
          program_id: payload.program_id || null,
          program_name: payload.program_name || null,
          category: payload.category || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("[Supabase] Notice saving to registrations:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn("[Supabase] Unexpected error saving registration:", err);
    return { success: false, error: err };
  }
}

/**
 * Save general campus contact inquiry to Supabase
 */
export async function saveInquiry(payload) {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: payload.name || null,
          college: payload.college || null,
          phone: payload.phone || null,
          message: payload.message || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("[Supabase] Notice saving to inquiries:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn("[Supabase] Unexpected error saving inquiry:", err);
    return { success: false, error: err };
  }
}
