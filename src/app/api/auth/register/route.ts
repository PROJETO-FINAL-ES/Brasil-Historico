import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  try {
    const user = await registerUser(email, password, name);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    
    // Caso o erro não seja do tipo esperado
    return NextResponse.json({ message: 'Erro desconhecido' }, { status: 400 });
  }
}
