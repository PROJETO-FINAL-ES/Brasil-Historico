// app/api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ message: 'Logout bem-sucedido' });

    // Remove o cookie de sessão
    response.cookies.set('sessionId', '', {
        httpOnly: true,
        maxAge: -1, // Define um cookie expirado
        path: '/',
    });

    return response;
}
