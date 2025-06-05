import { db } from "./db";
import * as schema from "./db/schema";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server-express";
import { eq } from "drizzle-orm";



const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const teste = async () => {
    const user = await db.query.users.findFirst();
    return user ? user.name : null;
};
const resolvers = {
    Query: {
        hello: teste,
    },
};

async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("API rodando!");
    });

    app.post("/user", async (req, res) => {
        const { name, email, password } = req.body;

        // validação básica
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios." });
        }
        try {
            const existing = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });

            if (existing) {
                return res.status(409).json({ error: "Usuário já existe." });
            }
            await db.insert(schema.users).values({
                name,
                email,
                passwordHash: password,
            });

            return res.status(201).json({ message: "Usuário criado com sucesso." });
        } catch (err) {
            console.error("Erro ao criar usuário:", err);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    });

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
