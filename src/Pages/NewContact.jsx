import React, { useState } from "react";
import useContacts from "../Hooks/useContacts";
import { useNavigate } from "react-router-dom";

const NewContact = () => {
  const { setContacts } = useContacts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleAddition = () => {
    fetch(`http://localhost:8000/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newContact) => {
        setContacts((prev) => [...prev, newContact]);

        navigate("/");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Add New Contact</strong>
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
                          id="firstName"
                          className="form-control"
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
                          id="lastName"
                          className="form-control"
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
                          onClick={handleAddition}
                        >
                          Add
                        </button>
                        <a href="/" className="btn btn-outline-secondary">
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

export default NewContact;
