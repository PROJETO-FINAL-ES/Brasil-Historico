import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Método POST para criar um novo agendamento
export async function POST(request: Request) {
    try {
        const { nome, email, data, quantidade, horario, nomeMuseu } = await request.json();

        if (!nome || !email || !data || !quantidade || !horario || !nomeMuseu) {
            return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
        }

        const appointment = await prisma.appointment.create({
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
        return NextResponse.json({ message: 'Erro ao salvar o agendamento.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Método GET para recuperar todos os agendamentos
export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany();
        return NextResponse.json(appointments);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao buscar agendamentos.' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
