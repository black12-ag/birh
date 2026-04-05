import React, { useState } from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    if (!form) {
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      attendance: "Attending",
      guests: "1",
      message: formData.get("message"),
    };


    if (!data.name || !data.message) {
      alert("Please fill in your name and message!");
      setLoading(false); 
      return;
    }

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Reset the form if submission is successful
      form.reset();
      alert("RSVP submitted successfully!");
    } else {
      alert("Failed to submit RSVP");
    }

    setLoading(false); // Set loading to false after response
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="block w-full p-2 text-sm font-medium text-center text-black bg-white border border-transparent rounded-md shadow-sm"
          disabled={loading} 
        >
          {loading ? "Submitting..." : "Submit"} 
        </button>
      </div>
    </form>
  );
};

export default Form;
