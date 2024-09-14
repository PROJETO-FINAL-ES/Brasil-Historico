// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Nome, email e senha são obrigatórios' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: 'Usuário já existe' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        // Cast error to any to access message
        const errorMessage = (error as Error).message || 'Erro desconhecido ao registrar usuário';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
