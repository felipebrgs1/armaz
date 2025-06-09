// filepath: c:\Users\felipeb\Desktop\armaz\apps\server\src\db\seed.ts

import { db } from './index';
import { 
    users, 
    roles, 
    userRoles,
    products,
    locations,
    inventory,
    movements 
} from './schemas';
import bcrypt from 'bcrypt';

async function seed() {
    console.log('🌱 Iniciando seed do banco de dados...');

    try {
        // 1. Limpar dados existentes (ordem importa devido às foreign keys)
        console.log('🗑️ Limpando dados existentes...');
        await db.delete(movements);
        await db.delete(inventory);
        await db.delete(userRoles);
        await db.delete(products);
        await db.delete(locations);
        await db.delete(roles);
        await db.delete(users);

        // 2. Criar roles
        console.log('👥 Criando roles...');
        const [adminRole, operatorRole, viewerRole] = await db.insert(roles).values([
            { name: 'admin' },
            { name: 'operator' },
            { name: 'viewer' }
        ]).returning();

        // 3. Criar usuários
        console.log('👤 Criando usuários...');
        const saltRounds = 10;
        const [adminUser, operatorUser, viewerUser] = await db.insert(users).values([
            {
                name: 'Administrador',
                email: 'admin@armaz.com',
                passwordHash: await bcrypt.hash('admin123', saltRounds)
            },
            {
                name: 'João Operador',
                email: 'joao@armaz.com',
                passwordHash: await bcrypt.hash('operator123', saltRounds)
            },
            {
                name: 'Maria Visualizadora',
                email: 'maria@armaz.com',
                passwordHash: await bcrypt.hash('viewer123', saltRounds)
            }
        ]).returning();

        // 4. Associar usuários a roles
        console.log('🔗 Associando usuários a roles...');
        await db.insert(userRoles).values([
            { userId: adminUser.id, roleId: adminRole.id },
            { userId: operatorUser.id, roleId: operatorRole.id },
            { userId: viewerUser.id, roleId: viewerRole.id }
        ]);

        // 5. Criar locais de armazenamento
        console.log('📍 Criando locais de armazenamento...');
        const [almoxarifado, deposito, producao, expedicao] = await db.insert(locations).values([
            {
                name: 'Almoxarifado Central',
                description: 'Local principal de armazenamento de produtos'
            },
            {
                name: 'Depósito A',
                description: 'Depósito auxiliar para produtos de grande volume'
            },
            {
                name: 'Área de Produção',
                description: 'Local de armazenamento temporário para produção'
            },
            {
                name: 'Expedição',
                description: 'Área de preparação para envio'
            }
        ]).returning();

        // 6. Criar produtos
        console.log('📦 Criando produtos...');
        const [produto1, produto2, produto3, produto4, produto5] = await db.insert(products).values([
            {
                name: 'Parafuso M6x20',
                sku: 'PAR-M6-20',
                description: 'Parafuso sextavado M6 comprimento 20mm',
                unit: 'unidade'
            },
            {
                name: 'Porca M6',
                sku: 'POR-M6',
                description: 'Porca sextavada M6',
                unit: 'unidade'
            },
            {
                name: 'Arruela Lisa M6',
                sku: 'ARR-M6-L',
                description: 'Arruela lisa para parafuso M6',
                unit: 'unidade'
            },
            {
                name: 'Cabo Elétrico 2.5mm',
                sku: 'CAB-25MM',
                description: 'Cabo elétrico flexível 2.5mm²',
                unit: 'metro'
            },
            {
                name: 'Tomada 20A',
                sku: 'TOM-20A',
                description: 'Tomada elétrica 20 amperes',
                unit: 'unidade'
            }
        ]).returning();

        // 7. Criar estoque inicial
        console.log('📊 Criando estoque inicial...');
        await db.insert(inventory).values([
            // Almoxarifado Central
            { productId: produto1.id, locationId: almoxarifado.id, quantity: 500 },
            { productId: produto2.id, locationId: almoxarifado.id, quantity: 300 },
            { productId: produto3.id, locationId: almoxarifado.id, quantity: 450 },
            { productId: produto4.id, locationId: almoxarifado.id, quantity: 150.5 },
            { productId: produto5.id, locationId: almoxarifado.id, quantity: 25 },
            
            // Depósito A
            { productId: produto1.id, locationId: deposito.id, quantity: 200 },
            { productId: produto4.id, locationId: deposito.id, quantity: 75.2 },
            
            // Área de Produção
            { productId: produto1.id, locationId: producao.id, quantity: 50 },
            { productId: produto2.id, locationId: producao.id, quantity: 40 },
            { productId: produto3.id, locationId: producao.id, quantity: 50 },
            
            // Expedição
            { productId: produto5.id, locationId: expedicao.id, quantity: 5 }
        ]);

        // 8. Criar histórico de movimentações
        console.log('📋 Criando histórico de movimentações...');
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);

        await db.insert(movements).values([
            // Entradas iniciais (há uma semana)
            {
                productId: produto1.id,
                locationId: almoxarifado.id,
                userId: adminUser.id,
                type: 'entrada',
                quantity: 500,
                timestamp: oneWeekAgo,
                notes: 'Estoque inicial - Compra fornecedor XYZ'
            },
            {
                productId: produto2.id,
                locationId: almoxarifado.id,
                userId: adminUser.id,
                type: 'entrada',
                quantity: 300,
                timestamp: oneWeekAgo,
                notes: 'Estoque inicial - Compra fornecedor ABC'
            },
            {
                productId: produto3.id,
                locationId: almoxarifado.id,
                userId: adminUser.id,
                type: 'entrada',
                quantity: 450,
                timestamp: oneWeekAgo,
                notes: 'Estoque inicial'
            },
            {
                productId: produto4.id,
                locationId: almoxarifado.id,
                userId: adminUser.id,
                type: 'entrada',
                quantity: 225.7,
                timestamp: oneWeekAgo,
                notes: 'Estoque inicial - Cabo elétrico em metros'
            },
            {
                productId: produto5.id,
                locationId: almoxarifado.id,
                userId: adminUser.id,
                type: 'entrada',
                quantity: 30,
                timestamp: oneWeekAgo,
                notes: 'Estoque inicial - Tomadas elétricas'
            },

            // Transferências internas (há 3 dias)
            {
                productId: produto1.id,
                locationId: deposito.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 200,
                timestamp: threeDaysAgo,
                notes: 'Transferência do almoxarifado central'
            },
            {
                productId: produto1.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 200,
                timestamp: threeDaysAgo,
                notes: 'Transferência para depósito A'
            },
            {
                productId: produto4.id,
                locationId: deposito.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 75.2,
                timestamp: threeDaysAgo,
                notes: 'Transferência do almoxarifado central'
            },
            {
                productId: produto4.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 75.2,
                timestamp: threeDaysAgo,
                notes: 'Transferência para depósito A'
            },

            // Saídas para produção (ontem)
            {
                productId: produto1.id,
                locationId: producao.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 50,
                timestamp: oneDayAgo,
                notes: 'Requisição para linha de produção'
            },
            {
                productId: produto1.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 50,
                timestamp: oneDayAgo,
                notes: 'Saída para produção'
            },
            {
                productId: produto2.id,
                locationId: producao.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 40,
                timestamp: oneDayAgo,
                notes: 'Requisição para linha de produção'
            },
            {
                productId: produto2.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 40,
                timestamp: oneDayAgo,
                notes: 'Saída para produção'
            },
            {
                productId: produto3.id,
                locationId: producao.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 50,
                timestamp: oneDayAgo,
                notes: 'Requisição para linha de produção'
            },
            {
                productId: produto3.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 50,
                timestamp: oneDayAgo,
                notes: 'Saída para produção'
            },

            // Preparação para expedição (hoje)
            {
                productId: produto5.id,
                locationId: expedicao.id,
                userId: operatorUser.id,
                type: 'entrada',
                quantity: 5,
                timestamp: now,
                notes: 'Preparação para envio - Pedido #001'
            },
            {
                productId: produto5.id,
                locationId: almoxarifado.id,
                userId: operatorUser.id,
                type: 'saida',
                quantity: 5,
                timestamp: now,
                notes: 'Saída para expedição - Pedido #001'
            }
        ]);

        console.log('✅ Seed concluído com sucesso!');
        console.log('\n📊 Resumo dos dados criados:');
        console.log(`- ${3} usuários`);
        console.log(`- ${3} roles`);
        console.log(`- ${4} locais de armazenamento`);
        console.log(`- ${5} produtos`);
        console.log(`- ${11} registros de estoque`);
        console.log(`- ${18} movimentações`);
        
        console.log('\n👤 Usuários criados:');
        console.log('- admin@armaz.com / admin123 (Administrador)');
        console.log('- joao@armaz.com / operator123 (Operador)');
        console.log('- maria@armaz.com / viewer123 (Visualizadora)');

    } catch (error) {
        console.error('❌ Erro durante o seed:', error);
        throw error;
    }
}

// Executar seed se este arquivo for executado diretamente
if (require.main === module) {
    seed()
        .then(() => {
            console.log('🎉 Processo de seed finalizado!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Falha no processo de seed:', error);
            process.exit(1);
        });
}

export { seed };