import React, {useState, useEffect} from "react";
import {Card, Button, Form, Row, Col} from "react-bootstrap";
import "./accueil.css";

interface CheckItem {
    label: string;
    checked: boolean;
    time: string;
    hour: string;
}

const Accueil: React.FC = () => {
    
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
    
    const [dayTasks, setDayTasks] = useState<CheckItem[]>(() => {
        const savedTasks = localStorage.getItem("dayTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [medications, setMedications] = useState<CheckItem[]>(() => {
        const savedMeds = localStorage.getItem("medications");
        return savedMeds ? JSON.parse(savedMeds) : [];
    });
    
    const [newTask, setNewTask] = useState("");
    const [taskHour, setTaskHour] = useState("");
    
    const [newMedication, setNewMedication] = useState("");
    const [medicationHour, setMedicationHour] = useState("");
    
    // Sauvegarder les données dans le localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem("dayTasks", JSON.stringify(dayTasks));
        localStorage.setItem("medications", JSON.stringify(medications));
    }, [dayTasks, medications]);
    
    const getCurrentTime = (): string => {
        const now = new Date();
        return now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    };
    
    const addTask = () => {
        if (newTask.trim()) {
            const updatedTasks = [
                ...dayTasks,
                {
                    label: newTask,
                    checked: false,
                    time: getCurrentTime(),
                    hour: taskHour ? `${taskHour}h` : "Non spécifiée",
                },
            ];
            setDayTasks(updatedTasks);
            setNewTask("");
            setTaskHour("");
        }
    };
    
    const addMedication = () => {
        if (newMedication.trim()) {
            const updatedMeds = [
                ...medications,
                {
                    label: newMedication,
                    checked: false,
                    time: getCurrentTime(),
                    hour: medicationHour ? `${medicationHour}h` : "Non spécifiée",
                },
            ];
            setMedications(updatedMeds);
            setNewMedication("");
            setMedicationHour("");
        }
    };
    
    const toggleTaskChecked = (index: number) => {
        const updatedTasks = [...dayTasks];
        updatedTasks[index].checked = !updatedTasks[index].checked;
        setDayTasks(updatedTasks);
    };
    
    const toggleMedicationChecked = (index: number) => {
        const updatedMeds = [...medications];
        updatedMeds[index].checked = !updatedMeds[index].checked;
        setMedications(updatedMeds);
    };
    
    const deleteTask = (index: number) => {
        setDayTasks(dayTasks.filter((_, i) => i !== index));
    };
    
    const deleteMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };
    
    const handlePDFView = () => {
        window.open("/Synthèse de la Semaine.pdf", "_blank");
    };
    
    const handleResearchSubmit = () => {
        alert(
            "Vos données ont été transmises à la recherche !\n\nMerci de votre confiance !"
        );
    };
    
    return (
        <div className="synthese-container">
            <Card className="synthese-card">
                <Card.Header className="synthese-header">
                    <h3 className="mb-0">📝 Ma Synthèse</h3>
                </Card.Header>
                <Card.Body>
                    <div className="synthese-content">
                        <div className="synthese-info">
                            <div className="synthese-date">
                                <h5>Date du jour</h5>
                                <p>{new Date().toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                        <div className="synthese-actions">
                            <div className="text-muted mb-3">
                                Dernière mise à jour : {lastUpdated}
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    className="btn-secondary"
                                    onClick={() => setLastUpdated(new Date().toLocaleString())}
                                >
                                    Actualiser
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handlePDFView}
                                >
                                    Visionner PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            
            <Row style={{width: "75%"}}>
                <Col md={6}>
                    <Card className="synthese-card">
                        <Card.Header className="synthese-header">
                            <h6>☀️ Ma Journée</h6>
                        </Card.Header>
                        <Card.Body>
                            <ul className="task-list">
                                {dayTasks.map((task, index) => (
                                    <li key={index} className="task-item">
                                        <div className="task-content">
                                            <Form.Check
                                                type="checkbox"
                                                checked={task.checked}
                                                onChange={() => toggleTaskChecked(index)}
                                            />
                                            <div>
                                                {task.label}
                                                <div className="task-details">
                                                    {task.time} — {task.hour}
                                                </div>
                                            </div>
                                        </div>
                                        {task.checked && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => deleteTask(index)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Form className="margin-top">
                                <Form.Control
                                    className="margin-bottom"
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Nouvelle tâche..."
                                />
                                <Form.Control
                                    className="margin-bottom"
                                    type="number"
                                    min="1"
                                    max="24"
                                    value={taskHour}
                                    onChange={(e) => setTaskHour(e.target.value)}
                                    placeholder="Heure prévue (1 à 24)"
                                />
                                <Button className="btn-secondary" onClick={addTask}>
                                    Ajouter
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card className="synthese-card">
                        <Card.Header className="synthese-header">
                            <h6>💊 Mon Pilulier</h6>
                        </Card.Header>
                        <Card.Body>
                            <ul className="medication-list">
                                {medications.map((med, index) => (
                                    <li key={index} className="medication-item">
                                        <div className="medication-content">
                                            <Form.Check
                                                type="checkbox"
                                                checked={med.checked}
                                                onChange={() => toggleMedicationChecked(index)}
                                            />
                                            <div>
                                                {med.label}
                                                <div className="medication-details">
                                                    {med.time} — {med.hour}
                                                </div>
                                            </div>
                                        </div>
                                        {med.checked && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => deleteMedication(index)}
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Form className="margin-top">
                                <Form.Control
                                    className="margin-bottom"
                                    type="text"
                                    value={newMedication}
                                    onChange={(e) => setNewMedication(e.target.value)}
                                    placeholder="Nouveau médicament..."
                                />
                                <Form.Control
                                    className="margin-bottom"
                                    type="number"
                                    min="1"
                                    max="24"
                                    value={medicationHour}
                                    onChange={(e) => setMedicationHour(e.target.value)}
                                    placeholder="Heure prévue (1 à 24)"
                                />
                                <Button className="btn-secondary" onClick={addMedication}>
                                    Ajouter
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Card className="synthese-card">
                <Card.Body className="text-center">
                    <Button variant="primary" onClick={handleResearchSubmit}>
                        🔗 Transmettre les données à la recherche
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Accueil;
