import React, { useEffect, useState } from "react";

const API_BASE = "https://koyeolukoya.pythonanywhere.com";

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${API_BASE}/about/about/`);
        const data = await res.json();

        setAbout(data.about);
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!about) return <p>No about data found</p>;

  return (
    <div className="container">
      <h1>About Me</h1>

      <div className="card">
        <h2>{about.full_name}</h2>
        <h4>{about.title}</h4>

        <p>{about.bio}</p>

        <p>
          <strong>📍 Location:</strong> {about.location}
        </p>
        <p>
          <strong>📧 Email:</strong> {about.email}
        </p>

        {/* Optional Links */}
        <div style={{ marginTop: "10px" }}>
          {about.github && (
            <a href={about.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}{" "}
          {about.linkedin && (
            <a href={about.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;