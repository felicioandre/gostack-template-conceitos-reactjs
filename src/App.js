import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Novo Repositório ${Date.now()}`,
      url: `https://github.com/rocketseat-education/bootcamp-gostack-desafios/`,
      techs: [`Javascript`, `CSS`],
    };
    const response = await api.post("repositories", newRepository);

    setRepositories([...repositories, response.data]);
  }
  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const repositoryIndex = repositories.findIndex((repo) => repo.id === id);
      const newList = [...repositories];
      newList.splice(repositoryIndex, 1);
      setRepositories([...newList]);
    } catch (e) {
      console.error("Error when trying to delete Repository: ", id);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
