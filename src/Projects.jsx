import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/";

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

              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  View Project →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;