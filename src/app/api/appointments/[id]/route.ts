import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Método PUT para atualizar um agendamento
export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Obtém o ID da URL

        if (!id) {
            return NextResponse.json({ message: 'O ID é obrigatório.' }, { status: 400 });
        }

        const { nome, email, data, quantidade, horario, nomeMuseu } = await request.json();

        if (!nome || !email || !data || !quantidade || !horario || !nomeMuseu) {
            return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
        }

        const appointment = await prisma.appointment.update({
            where: { id },
            data: {
                nome,
                email,
                data: new Date(data),
                quantidade: parseInt(quantidade, 10),
                horario,
                nomeMuseu,
            },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao atualizar o agendamento.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Método DELETE para excluir um agendamento
export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Obtém o ID da URL

        if (!id) {
            return NextResponse.json({ message: 'O ID é obrigatório.' }, { status: 400 });
        }

        await prisma.appointment.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Agendamento excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao excluir o agendamento.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
