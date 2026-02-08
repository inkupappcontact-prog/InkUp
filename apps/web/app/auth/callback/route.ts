import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  // On récupère le code envoyé par Google dans l'URL
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // On échange le code contre une session utilisateur réelle
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Une fois connecté, on renvoie l'utilisateur vers la page d'accueil
  return NextResponse.redirect(requestUrl.origin)
}