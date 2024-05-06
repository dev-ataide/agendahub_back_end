import { Request, Response } from "express";
import { CreateClientPdf } from "../../services/client/ClientPdfService";

class ClientPdfController {
    async handle(req: Request, res: Response) {
        try {
            const { clientId } = req.body;

            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Nenhum arquivo foi enviado");
            }

            const files = Array.isArray(req.files['pdf']) ? req.files['pdf'] : [req.files['pdf']];

            const ClientPdf = new CreateClientPdf();

            const pdfs = await Promise.all(files.map(async (file: Express.Multer.File) => {
                return await ClientPdf.execute({ clientId, caminho: file.path });
            }));

            return res.json(pdfs);
        } catch (error) {
            console.error("Erro ao processar o upload do arquivo:", error);
            return res.status(500).json({ error: "Erro ao processar o upload do arquivo" });
        }
    }
}

export { ClientPdfController };
