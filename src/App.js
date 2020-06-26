import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  async function handleAddRepository() {
    // const repository = {
      //     id: "123",
      //     url: "https://github.com/josepholiveira",
      //     title: "Desafio ReactJS",
      //     techs: ["React", "Node.js"],
      // }
    const repository = {
      id,
      url,
      title,
      techs
    }
    const response = await api.post('repositories', repository);
    const repo = response.data;
    console.log(repo);
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
