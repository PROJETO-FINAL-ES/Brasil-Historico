// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

// Crie uma instância do PrismaClient
const prisma = new PrismaClient();

// Função para salvar o arquivo no sistema de arquivos
async function saveFile(stream: ReadableStream<Uint8Array>, filename: string): Promise<string> {
    const filePath = path.join(process.cwd(), 'public/uploads', filename);
    const writer = fs.createWriteStream(filePath);

    const reader = stream.getReader();
    let result = await reader.read();
    while (!result.done) {
        writer.write(Buffer.from(result.value));
        result = await reader.read();
    }

    writer.end();
    return `/uploads/${filename}`;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string; // Supondo que o userId é enviado no formulário

        if (!file || !userId) {
            return NextResponse.json({ message: 'Arquivo ou ID de usuário não fornecido' }, { status: 400 });
        }

        const filename = `${Date.now()}-${file.name}`;
        const filePath = await saveFile(file.stream(), filename);

        // Atualiza o usuário com o caminho da imagem
        const user = await prisma.user.update({
            where: { id: userId }, // Atualize conforme necessário
            data: { profilePicture: filePath },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message || 'Erro desconhecido';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
