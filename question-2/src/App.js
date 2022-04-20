import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.publicapis.org/categories")
      .then((res) => res.json())
      .then((response) => {
        setCategories(response?.categories);
      });
  }, []);

  const categoriesTable = useMemo(() => {
    const categorieList = search
      ? categories.filter(
          (categorie) =>
            categorie.toLowerCase().search(search.toLowerCase()) !== -1
        )
      : categories;

    return (
      <table>
        <tbody>
          <tr>
            <th>Categories</th>
          </tr>
          {categorieList.map((categorie) => (
            <tr key={categorie}>
              <td>{categorie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [categories, search]);

  return (
    <div className="app-container">
      <input placeholder="Search Categorie" onChange={(e) => setSearch(e.target.value)} />
      {categoriesTable}
    </div>
  );
}

export default App;
