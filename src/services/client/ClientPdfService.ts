import prismaClient from "../../prisma";

interface Pdf {
    clientId: string;
    caminho: string;
}

class CreateClientPdf {
    async execute({ clientId, caminho }: Pdf) {
        try {
            console.log('Processing data:', { clientId, caminho });

            // Certifique-se de que clientId corresponde ao tipo esperado pelo Prisma (string)
            // e caminho é uma string contendo o caminho do arquivo PDF

            const clientPdf = await prismaClient.pdf.create({
                data: {
                    clientId,
                    caminho,
                },
            });

            return clientPdf;
        } catch (error) {
            console.error('Erro ao criar pdf no cliente:', error);
            throw new Error('Falha ao criar pdf no cliente');
        }
    }
}

export {CreateClientPdf}
