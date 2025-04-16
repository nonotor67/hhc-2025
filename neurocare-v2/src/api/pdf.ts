import {Response} from 'express';
import fs from 'fs';
import path from 'path';

export default function handler(res: Response) {
    const pdfPath = path.join(process.cwd(), 'src', 'Synthèse de la Semaine.pdf');
    
    try {
        const pdfBuffer = fs.readFileSync(pdfPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Synthèse de la Semaine.pdf"');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Erreur lors de la lecture du PDF:', error);
        res.status(500).json({error: 'Impossible de lire le fichier PDF'});
    }
} 