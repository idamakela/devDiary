import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient();

export default supabase;

/*
 * NOTES
 * export default --> import supabase
 * export const --> import {supabase}
 * får bara finnas en export default per sida
 */
