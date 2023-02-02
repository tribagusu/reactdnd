import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { SortableItem } from "./SortableItem";
import axios from "axios";
import Select from "react-select";

function App() {
  const [query, setQuery] = useState("");
  const [newUsers, setNewUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleDragEnd = (event) => {
    // console.log("drag end called");
    const { active, over } = event;
    // console.log("active", active.id);
    // console.log("over", over.id);

    if (active.id !== over.id) {
      setNewUsers((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        const newArray = arrayMove(items, activeIndex, overIndex);
        console.log(newArray);
        return newArray;
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const data = await res.data;
      const user = data.map((user) => {
        return {
          value: user.username,
          label: user.username,
        };
      });
      setUsers(user);
    };
    getData();
  }, []);

  // react select
  const onChange = (selected) => {
    setQuery(selected.value);
  };

  const handleAdd = () => {
    if (query.length !== 0) {
      setNewUsers((q) => {
        return [...q, query];
      });
    }
  };

  return (
    <div className="App">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Container className="p-3" style={{ width: "50%" }} align="center">
          <h3>Questions</h3>
          <div style={{ display: "flex" }}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={users[0]}
              isClearable
              isSearchable
              name="color"
              options={users}
              onChange={onChange}
            />
            <button onClick={handleAdd}>Add</button>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          ></div>
          <SortableContext
            items={newUsers}
            strategy={verticalListSortingStrategy}
          >
            {newUsers.map((user, index) => (
              <SortableItem key={user} id={user} index={index} />
            ))}
          </SortableContext>
        </Container>
      </DndContext>
    </div>
  );
}

export default App;
