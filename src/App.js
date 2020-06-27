import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [dados, setDados] = useState({});
  // const [url, setUrl] = useState('');
  // const [title, setTitle] = useState('');
  // const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const repository = {
          id: "123",
          url: "https://github.com/josepholiveira",
          title: "Desafio ReactJS",
          techs: ["React", "Node.js"],
      }

    const response = await api.post('repositories', repository);
    const repo = response.data;
    console.log(repo);
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
          ))}
      </ul>
      <textarea name="" id="" cols="70" rows="30" value={dados} onChange={e => setDados(e.target.value)}></textarea>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
