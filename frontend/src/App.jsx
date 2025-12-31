import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects/github-sync');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please ensure the backend is running.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading projects...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: '#ff6b6b', marginTop: '50px' }}>{error}</div>;
  }

  return (
    <div className="portfolio-container">
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>My GitHub Projects</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
        Live data fetched via NestJS Backend
      </p>

      <div style={styles.gridContainer}>
        {projects.map((project, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{project.title}</h3>
            <p style={styles.cardDescription}>
              {project.description || 'No description available.'}
            </p>

            <div style={styles.cardMeta}>
              <span>⭐ {project.stars}</span>
              <span>🛠 {project.language || 'N/A'}</span>
            </div>

            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    border: '1px solid #333',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease',
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#fff',
  },
  cardDescription: {
    color: '#bbb',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  cardMeta: {
    display: 'flex',
    gap: '15px',
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '15px',
  },
  link: {
    color: '#646cff',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default App;