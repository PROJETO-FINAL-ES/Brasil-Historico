import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Para comparação de senhas criptografadas

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    // Verifica o usuário no banco de dados
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error('Usuário não encontrado:', email);
        return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    // Verifica se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.error('Senha inválida para o usuário:', email);
        return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    // Cria uma sessão (vamos usar o ID do usuário para identificá-lo)
    const sessionId = `session-${user.id}`; // Use o ID diretamente, sem necessidade de conversão

    // Define um cookie de sessão no cliente usando NextResponse
    const response = NextResponse.json({ message: 'Login bem-sucedido' });

    // Define o cookie diretamente no cabeçalho de resposta
    response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
    });

    return response;
}
