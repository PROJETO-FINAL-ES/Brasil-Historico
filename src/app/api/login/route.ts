// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
        }

        // Find the user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        // Cast error to any to access message
        const errorMessage = (error as Error).message || 'Erro desconhecido ao realizar login';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
