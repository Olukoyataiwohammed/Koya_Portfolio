import React, { useEffect, useState } from "react";

const API_BASE = "https://koyeolukoya.pythonanywhere.com/";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}projects/`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="container">
      <h1>My Projects</h1>

      <div className="grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <img
                className="image"
                src={`https://koyeolukoya.pythonanywhere.com${project.image}`}
                alt={project.title}
                style={{
                  width: "400px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />

              <p>{project.tech_stack}</p>

              {project.live_link && (
                <a
                  style={{ textDecoration: "none", color: "black" }}
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
    </div>
  );
};

export default Projects;