'use client';

import { useState } from 'react';

interface GraphQLResponse {
    data?: {
        createUser?: {
            id: string;
            name: string;
            email: string;
        };
    };
    errors?: Array<{ message: string }>;
}

export default function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState<
        GraphQLResponse | { error: string } | null
    >(null);
    const [loading, setLoading] = useState(false);

    const createUser = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation CreateUser($name: String!, $email: String!, $passwordHash: String!) {
                            createUser(name: $name, email: $email, passwordHash: $passwordHash) {
                                id
                                name
                                email
                            }
                        }
                    `,
                    variables: {
                        name,
                        email,
                        passwordHash: password,
                    },
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Erro desconhecido',
            });
        }
        setLoading(false);
    };

    return (
        <div className='p-8'>
            <h1 className='bg-amber-300 p-4 rounded mb-8'>
                Home Armazen - GraphQL Test
            </h1>

            <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>
                    Criar Usuário (Teste)
                </h2>

                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Nome:
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full border border-gray-300 rounded px-3 py-2'
                            placeholder='Digite o nome'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Email:
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border border-gray-300 rounded px-3 py-2'
                            placeholder='Digite o email'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Senha:
                        </label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full border border-gray-300 rounded px-3 py-2'
                            placeholder='Digite a senha'
                        />
                    </div>

                    <button
                        onClick={createUser}
                        disabled={loading || !name || !email || !password}
                        className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300'
                    >
                        {loading ? 'Criando...' : 'Criar Usuário'}
                    </button>
                </div>

                {result && (
                    <div className='mt-4 p-4 bg-gray-100 rounded'>
                        <h3 className='font-bold mb-2'>Resultado:</h3>
                        <pre className='text-sm overflow-auto'>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
