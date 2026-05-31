import React, { useEffect, useState } from "react";
import "./App.css";

import images from "./assets/taiwoOne.jpg";

const API_BASE = "https://koyeolukoya.pythonanywhere.com";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wantedProject, setWantedProject] = useState([]);

  useEffect(() => {
    const wantedProjectIds = [1];

    Promise.all(
      wantedProjectIds.map((id) =>
        fetch(`${API_BASE}/projects/projects/${id}/`)
          .then((res) => res.json())
          .then((data) => data.data)
      )
    ).then(setWantedProject);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutRes = await fetch(`${API_BASE}/about/about/`);
        const aboutData = await aboutRes.json();

        setAbout(aboutData.about);
        setSkills(aboutData.skills);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="portfolio_homePage" style={{ padding: "20px" }}>
      {/* HERO SECTION */}
      <section
        className="first_section"
        style={{ marginBottom: "0px", marginTop: "0px" }}
      >
        <img className="imag" src={images} alt="#" />
        <div className="sect text-black">
          <h4 className="section_header ">
            {about ? (
              <>
                Hi, <br /> I'M {about?.full_name}
              </>
            ) : (
              "No data"
            )}
          </h4>
          <p
            className="section_bio"
            style={{ width: "400px", padding: "10px" }}
          >
            {about?.bio}
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ marginTop: "150px", marginBottom: "450px" }}>
        <h2>My Skills</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  padding: "5px 10px",
                  background: "#eee",
                  borderRadius: "10px",
                }}
              >
                {skill.name} ({skill.level}%)
              </span>
            ))
          ) : (
            <p>No skills found</p>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <h2>Projects</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            border: "solid thin black",
          }}
        >
          {wantedProject.length > 0 ? (
            wantedProject.map((project) => (
              <div
                key={project.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {/* FIXED IMAGE URL */}
                <img
                  className="image"
                  src={`${API_BASE}${project.image}`}
                  alt={project.title}
                  style={{
                    width: "400px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                <button
                  onClick={() => window.open(project.live_link, "_blank")}
                  style={{ cursor: "pointer", marginTop: "10px" }}
                >
                  Live Demo
                </button>

                {project.live_link && (
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;