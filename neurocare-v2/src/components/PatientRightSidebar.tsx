import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importer le style de date-picker
import "bootstrap/dist/css/bootstrap.min.css";
import "./PatientRightSidebar.css";

const PatientRightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"notes" | "agenda">("notes");
  const [notes, setNotes] = useState<
    { date: string; description: string; etat: string }[]
  >([]);
  const [agenda, setAgenda] = useState<{ date: string; event: string }[]>([]);
  const [newNote, setNewNote] = useState({ description: "", etat: "😊" });
  const [newEvent, setNewEvent] = useState({ date: new Date(), event: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleEtatChange = (value: string) => {
    setNewNote((prev) => ({ ...prev, etat: value }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setNewEvent((prev) => ({ ...prev, date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "notes" && newNote.description.trim()) {
      setNotes((prevData) =>
        [{ date: new Date().toLocaleString(), ...newNote }, ...prevData].slice(
          0,
          4
        )
      );
      setNewNote({ description: "", etat: "😊" });
    } else if (
      activeTab === "agenda" &&
      newEvent.event.trim() &&
      newEvent.date
    ) {
      setAgenda((prevData) =>
        [
          { date: newEvent.date.toLocaleString(), event: newEvent.event },
          ...prevData,
        ].slice(0, 4)
      );
      setNewEvent({ date: new Date(), event: "" });
    }
  };

  return (
    <Col className="bg-light vh-100 d-flex flex-column p-3">
      <Row className="text-center mb-3 border-bottom">
        <Col
          xs={6}
          className={`mb-3 border-end tab ${
            activeTab === "notes" ? "active" : ""
          }`}
          onClick={() => setActiveTab("notes")}
        >
          <h5>Notes</h5>
        </Col>
        <Col
          xs={6}
          className={`mb-3 tab ${activeTab === "agenda" ? "active" : ""}`}
          onClick={() => setActiveTab("agenda")}
        >
          <h5>Agenda</h5>
        </Col>
      </Row>
      <Row className="mb-3 border-bottom">
        {activeTab === "notes"
          ? notes.map((item, index) => (
              <Row className="mb-3" key={index}>
                <p>
                  <strong>Date :</strong> {item.date}
                </p>
                <p>
                  <strong>Description :</strong> {item.description}
                </p>
                <p>
                  <strong>État :</strong> {item.etat}
                </p>
              </Row>
            ))
          : agenda.map((item, index) => (
              <Row className="mb-3" key={index}>
                <p>
                  <strong>Date :</strong> {item.date}
                </p>
                <p>
                  <strong>Événement :</strong> {item.event}
                </p>
              </Row>
            ))}
      </Row>
      <Row className="mt-auto">
        <Form onSubmit={handleSubmit}>
          {activeTab === "notes" ? (
            <>
              <Form.Group controlId="noteDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={newNote.description}
                  onChange={handleInputChange}
                  placeholder="Entrez une description"
                />
              </Form.Group>
              <Form.Group controlId="noteEtat" className="mt-2">
                <Form.Label>État</Form.Label>
                <div className="d-flex justify-content-between px-5">
                  <ToggleButtonGroup
                    type="radio"
                    name="etat"
                    value={newNote.etat}
                    onChange={handleEtatChange}
                  >
                    <ToggleButton id="happy" value="😊" className="emoji-btn">
                      😊
                    </ToggleButton>
                    <ToggleButton id="neutral" value="😐" className="emoji-btn">
                      😐
                    </ToggleButton>
                    <ToggleButton id="sad" value="😢" className="emoji-btn">
                      😢
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group controlId="eventDate">
                <Form.Label>Date et Heure</Form.Label>
                <DatePicker
                  selected={newEvent.date}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control"
                  placeholderText="Sélectionner une date et une heure"
                />
              </Form.Group>
              <Form.Group controlId="eventDescription" className="mt-2">
                <Form.Label>Nouvel événement</Form.Label>
                <Form.Control
                  type="text"
                  name="event"
                  value={newEvent.event}
                  onChange={handleEventChange}
                  placeholder="Entrez un événement"
                />
              </Form.Group>
            </>
          )}
          <Form.Control
            type="submit"
            value="Ajouter"
            className="mt-3 btn btn-primary"
          />
        </Form>
      </Row>
    </Col>
  );
};

export default PatientRightSidebar;
