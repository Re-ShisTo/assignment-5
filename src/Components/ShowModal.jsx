import React from "react";
import "../assets/css/ShowModal.css";
import useContacts from "../Hooks/useContacts";

const ShowModal = () => {
  const { activeModal, contactData, closeModal, openEditModal, handleDelete } =
    useContacts();

  if (activeModal !== "show" || !contactData) return null;
  const contact = contactData;
  return (
    <main className=" py-5 show-modal active">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Contact Details</strong>
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
                        <p className="form-control-plaintext text-muted">
                          {contact.firstName}
                        </p>
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
                        <p className="form-control-plaintext text-muted">
                          {contact.lastName}
                        </p>
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
                        <p className="form-control-plaintext text-muted">
                          {contact.email}
                        </p>
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
                        <p className="form-control-plaintext text-muted">
                          {contact.phone}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="name" className="col-md-3 col-form-label">
                        Address
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {contact.address}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group row mb-0">
                      <div className="col-md-9 offset-md-3">
                        <a
                          className="btn btn-info"
                          onClick={() => openEditModal(contact)}
                        >
                          Edit
                        </a>
                        <a
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </a>
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

export default ShowModal;
