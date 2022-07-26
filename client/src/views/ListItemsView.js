import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";

function ListItemsView() {
  let { id } = useParams();
  const [input, setInput] = useState([]); // 1
  const [items, setItems] = useState([]); // 2
  const [error, setError] = useState([]); // 3
  const [listName, setListName] = useState([]); // 4

  useEffect(() => {
    getItems(id);
    getListName(id);
  }, []);

  const getItems = async (listId) => {
    try {
      let res = await fetch(`/items/${listId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      console.log(data);
      setItems(data);
    } catch (err) {
      setError(err);
    }
  };

  const addItem = async () => {
    setError("");
    console.log(input);
    if (input.length === 0) return;
    try {
      const res = await fetch(`/items/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FK_lists_id: id,
          name: input,
          isComplete: 0,
        }),
      });
      console.log(res);
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setInput("");
    }
  };

  const updateItems = async (id) => {
    let idx = items.findIndex((item) => item.id === id);
    console.log("Esto es id: " + id);
    console.log("Esto es idx: " + idx);
    try {
      let res = await fetch(`/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isComplete: items[idx].isComplete,
        }),
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  const markComplete = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItems);
    console.log(items);
    updateItems(id);
  };

  const deleteItem = async (id) => {
    try {
      let res = await fetch(`/items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      setItems(data);
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  const getListName = async (listId) => {
    try {
      let res = await fetch(`/lists/${listId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw res.statusText;
      const data = await res.json();
      setListName(data.name);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="ItemsView">
      <TripByIdNav />
      <div className="tripById">
        <h1>{listName} </h1>
        {error}
        <div className="mt-4 divide-y bg-white shadow rounded p-4">
          {items &&
            items.map((item) => (
              <div key={item.id} className="flex justify-between">
                {item.name}
                <input
                  type="checkbox"
                  checked={item.isComplete}
                  onChange={() => markComplete(item.id)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => deleteItem(item.id)}
                >
                  delete
                </button>
              </div>
            ))}
        </div>
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            New Task:
            <br />
            <input
              className="form-control"
              value={input}
              placeholder="ex ... hygiene supplies"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br />
          <button className="btn btn-primary" type="submit">
            Add New
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListItemsView;
