import React, { useEffect, useState } from "react";
import "../assets/css/EditModal.css";
import useContacts from "../Hooks/useContacts";

const EditModal = () => {
  const { activeModal, contactData, closeModal, setContacts, openShowModal } =
    useContacts();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (activeModal === "edit" && contactData) {
      if (formData.firstName === "") {
        setFormData({
          firstName: contactData.firstName || "",
          lastName: contactData.lastName || "",
          email: contactData.email || "",
          phone: contactData.phone || "",
          address: contactData.address || "",
        });
      }
    }
  }, [activeModal, contactData, formData.firstName]);

  if (activeModal !== "edit" || !contactData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/contacts/${contactData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, id: contactData.id }),
    })
      .then((res) => res.json())
      .then((updatedContact) => {
        setContacts((prev) =>
          prev.map((el) => (el.id === updatedContact.id ? updatedContact : el))
        );
        openShowModal(updatedContact);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="py-5 edit-modal active">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>EDIT</strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label
                        htmlFor="first_name"
                        className="col-md-3 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="firstName"
                          id="first_name"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="last_name"
                        className="col-md-3 col-form-label"
                      >
                        Last Name
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="lastName"
                          id="last_name"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-md-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="phone"
                        className="col-md-3 col-form-label"
                      >
                        Phone
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="name" className="col-md-3 col-form-label">
                        Address
                      </label>
                      <div className="col-md-9">
                        <textarea
                          name="address"
                          id="address"
                          rows="3"
                          className="form-control"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group row mb-0">
                      <div className="col-md-9 offset-md-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <a
                          className="btn btn-outline-secondary"
                          onClick={closeModal}
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditModal;
