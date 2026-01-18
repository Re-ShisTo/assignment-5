import { useEffect, useState } from "react";
import useContacts from "../Hooks/useContacts";

const Main = () => {
  const { contacts, setContacts, openShowModal, openEditModal, handleDelete } =
    useContacts();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState();
  const [sortOption, setSortOption] = useState();

  useEffect(() => {
    fetch(`https://contact-db-df7v.onrender.com/contacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, [setContacts]);

  const filterContacts = (Array.isArray(contacts) ? contacts : [])
    .filter((c) => {
      if (!search) return true;
      const searchString = `
        ${c.firstName || ""},
        ${c.lastName || ""},
        ${c.firstname + " " + c.lastname || ""}
        ${c.email || ""},
        ${c.phone || ""},
      `.toLowerCase();

      return searchString.includes(search.toLowerCase());
    })

    .sort((x, y) => {
      switch (sortOption) {
        case "1":
          return x.firstName.localeCompare(y.firstName);
        case "2":
          return x.lastName.localeCompare(y.lastName);
        case "3":
          return x.id - y.id;
        default:
          return 0;
      }
    });

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-title">
                <div className="d-flex align-items-center justify-content-between">
                  <h2>All Contacts</h2>
                  <div className="input-group w-50">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search contact"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                      className="btn btn-success"
                      type="button"
                      id="button-addon2"
                      onClick={() => setSearch(searchInput)}
                    >
                      Search
                    </button>
                  </div>
                  <div>
                    <a href="/newContact" className="btn btn-success">
                      <i className="fa fa-plus-circle"></i> Add New
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3">
                <div className="fs-2">
                  <i className="fa fa-filter text-success"></i> Filter
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="1">First Name (A → Z)</option>
                  <option value="2">Last Name (A → Z)</option>
                  <option value="3">Oldest To First</option>
                </select>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterContacts.map((contact, index) => {
                      return (
                        <tr key={contact.id}>
                          <td>{index + 1}</td>
                          <td>{contact.firstName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                          <td width="150">
                            <a
                              className="btn btn-sm btn-circle btn-outline-info"
                              title="Show"
                              onClick={() => {
                                openShowModal(contact);
                              }}
                            >
                              <i className="fa fa-eye"></i>
                            </a>
                            <a
                              className="btn btn-sm btn-circle btn-outline-secondary"
                              title="Edit"
                              onClick={() => {
                                openEditModal(contact);
                              }}
                            >
                              <i className="fa fa-edit"></i>
                            </a>
                            <a
                              className="btn btn-sm btn-circle btn-outline-danger"
                              title="Delete"
                              onClick={() => handleDelete(contact.id)}
                            >
                              <i className="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
