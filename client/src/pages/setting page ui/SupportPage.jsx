import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useNotification } from "../../context/NotificationProvider";


const SupportPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const { triggerNotification } = useNotification(); // Use the notification hook
  

  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      user_id: user?.userId || 1,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date_of_submission: new Date().toISOString().split('T')[0],
    };
    try {
      const response = await fetch(`${apiUrl}/support/submit-support-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        // toast.success("Your request has been submitted successfully.");
        triggerNotification(
          "Your request has been submitted successfully."
        );
        setFormData({ email: "", subject: "", message: "" });
      } else {
        // toast.error("Failed to submit: " + data.message);
        triggerNotification(
          "Failed to submit: " + data.message
        );
      }
    } catch (error) {
      // toast.error("An error occurred. Please try again later.");
      triggerNotification(
        "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white shadow-lg rounded-lg p-6 md:p-12">
        {/* Left Side - Contact Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">We're Here to Help You</h1>
          <p className="text-gray-600 mb-6">Feel free to contact us with any questions or concerns!</p>
          <div className="space-y-4">
            <ContactInfo icon={<FaEnvelope className="text-blue-700" />} text="info@ollato.com" link="mailto:info@ollato.com" />
            <ContactInfo icon={<FaMapMarkerAlt className="text-blue-700" />} text="618, Nirmal Corporate Centre, LBS Road, Mulund West, Mumbai." />
            <ContactInfo icon={<FaPhoneAlt className="text-blue-700" />} text="+91 9967153285" link="tel:+9967153285" />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Email" type="email" name="email" value={formData.email} handleChange={handleChange} required />
            <FormField label="Subject" type="select" name="subject" value={formData.subject} handleChange={handleChange} required options={[
              { value: "", text: "Select Subject" },
              { value: "appointment", text: "Appointment" },
              { value: "technical", text: "Technical Issue" },
              { value: "others", text: "Others" },
            ]} />
            <FormField label="Message" type="textarea" name="message" value={formData.message} handleChange={handleChange} required />
            <button type="submit" disabled={loading} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      {/* <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable /> */}
    </div>
  );
};

const FormField = ({ label, type, name, value, handleChange, required, options }) => (
  <div>
    <label className="block font-medium mb-1">{label}:</label>
    {type === "select" ? (
      <select className="w-full p-2 border rounded-lg" id={name} name={name} value={value} onChange={handleChange} required={required}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.text}</option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea className="w-full p-2 border rounded-lg" id={name} name={name} value={value} onChange={handleChange} required={required}></textarea>
    ) : (
      <input className="w-full p-2 border rounded-lg" type={type} id={name} name={name} value={value} onChange={handleChange} required={required} />
    )}
  </div>
);

const ContactInfo = ({ icon, text, link }) => (
  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md">
    {icon}
    {link ? <a href={link} className="text-blue-700 font-semibold hover:underline">{text}</a> : <span>{text}</span>}
  </div>
);

export default SupportPage;