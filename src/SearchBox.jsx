import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_BASE_URL = "https://koyeolukoya.pythonanywhere.com";

const SearchBox = () => {
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/projects/search/?search=${searchQuery}`
        );

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProjects();
    }
  }, [searchQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results</h1>

      <p>
        You searched for: <strong>{searchQuery}</strong>
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length > 0 ? (
        <div>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h2>{project.title}</h2>

              {project.image && (
                <img
                  src={`${API_BASE_URL}${project.image}`}
                  alt={project.title}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "10px",
                  }}
                />
              )}

              <p>{project.description}</p>

              <p>
                <strong>Technologies:</strong> {project.tech_stack}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default SearchBox;