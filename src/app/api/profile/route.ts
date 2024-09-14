import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // Obtenha o cookie de sessão como uma string
        const sessionIdCookie = req.cookies.get('sessionId')?.value || ''; // Usando ?.value para garantir que obtemos a string

        // Verifique se o cookie de sessão existe e é uma string
        if (!sessionIdCookie || typeof sessionIdCookie !== 'string') {
            return NextResponse.json({ message: 'Sessão não encontrada' }, { status: 401 });
        }

        // Extraia o ID do usuário do sessionId
        const userId = sessionIdCookie.replace('session-', '');

        // Verifique se o ID do usuário é válido
        if (!userId) {
            return NextResponse.json({ message: 'ID do usuário não encontrado' }, { status: 401 });
        }

        // Encontre o usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        // Verifique se o usuário existe
        if (!user) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }

        // Retorne os dados do perfil do usuário
        return NextResponse.json(user);

    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 });
    } finally {
        // Sempre desconecte o Prisma Client
        await prisma.$disconnect();
    }
}
