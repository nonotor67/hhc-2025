import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import "./Documents.css";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image";
  file: string; // URL ou base64
  category: string;
  uploadDate: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(() => {
    const saved = localStorage.getItem("documents");
    return saved ? JSON.parse(saved) : [];
  });

  const [newDocument, setNewDocument] = useState<{
    name: string;
    category: string;
    file: File | null;
  }>({
    name: "",
    category: "",
    file: null,
  });

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewDocument({
        ...newDocument,
        file,
        name: file.name,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newDocument.file && newDocument.category) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const documentType = newDocument.file!.type.startsWith("image/") ? "image" : "pdf";
        
        const newDoc: Document = {
          id: Date.now().toString(),
          name: newDocument.name,
          type: documentType,
          file: fileContent,
          category: newDocument.category,
          uploadDate: new Date().toLocaleDateString(),
        };

        setDocuments([...documents, newDoc]);
        setNewDocument({
          name: "",
          category: "",
          file: null,
        });
      };
      reader.readAsDataURL(newDocument.file);
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const renderDocumentCard = (doc: Document) => {
    return (
      <Card key={doc.id} className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5>{doc.name}</h5>
              <p className="mb-1">Catégorie: {doc.category}</p>
              <p className="mb-1">Date d'ajout: {doc.uploadDate}</p>
              {doc.type === "image" ? (
                <div className="image-preview">
                  <i className="fas fa-file-image text-primary" style={{ fontSize: "2rem" }}></i>
                  <Button
                    variant="link"
                    href={doc.file}
                    target="_blank"
                    className="ms-2"
                  >
                    Ouvrir l'image
                  </Button>
                </div>
              ) : (
                <div className="pdf-preview">
                  <i className="fas fa-file-pdf text-danger" style={{ fontSize: "2rem" }}></i>
                  <Button
                    variant="link"
                    href={doc.file}
                    target="_blank"
                    className="ms-2"
                  >
                    Ouvrir le PDF
                  </Button>
                </div>
              )}
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteDocument(doc.id)}
            >
              Supprimer
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="documents-container">
      <h1 className="documents-title">Mes Documents</h1>
      
      <Card className="documents-card mb-4">
        <Card.Body>
          <h2 className="mb-4">Ajouter un document</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Ordonnances, Examens, etc."
                value={newDocument.category}
                onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Document (PDF ou Image)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Ajouter le document
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        <Col>
          <h2 className="mb-4">Documents enregistrés</h2>
          {documents.length === 0 ? (
            <p>Aucun document enregistré</p>
          ) : (
            documents.map(renderDocumentCard)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Documents;
