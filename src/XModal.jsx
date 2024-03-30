/** @format */

import { useState, useEffect, useRef } from "react";
import "./Modal.css";
const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        if (!submitted) {
          handleCloseModal();
        } else {
          setSubmitted(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, submitted]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    // Clear form fields and errors when closing modal
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Please enter your username";
    }
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Invalid email. Please check your email address.";
    }
    if (
      !formData.phone ||
      formData.phone.length !== 10 ||
      isNaN(formData.phone)
    ) {
      newErrors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }
    if (!formData.dob) {
      newErrors.dob = "Please enter your date of birth";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(formData.dob);
      if (selectedDate > currentDate) {
        newErrors.dob = "Invalid date of birth";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here, e.g., submit data to server
      setSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Form</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalContentRef}>
            <form>
              <label>Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
              <br />
              <label>Email:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <br />
              <label>Phone:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
              <br />
              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
              <br />
              <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
