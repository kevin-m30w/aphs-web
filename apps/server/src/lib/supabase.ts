import { createClient } from "@supabase/supabase-js";
import { publishableKey, secretKey, url } from "./env";

export const supabaseAuth = createClient(url, publishableKey);

export const supabaseAdmin = createClient(url, secretKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
