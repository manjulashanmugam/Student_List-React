import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {

  const [students, setStudents] = useState([
    { id: 1, name: "Arun", roll: 101 },
    { id: 2, name: "Divya", roll: 102 },
    { id: 3, name: "Karthik", roll: 103 },
    { id: 4, name: "Priya", roll: 104 },
  ]);

  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState("home");

  const [newName, setNewName] = useState("");
  const [newRoll, setNewRoll] = useState("");

  // ✅ Add Student
  const addStudent = () => {
    if (!newName || !newRoll) {
      alert("Enter both name and roll number");
      return;
    }

    const rollExists = students.some(
      (student) => student.roll === Number(newRoll)
    );

    if (rollExists) {
      alert("Roll number already exists!");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: newName,
      roll: Number(newRoll),
    };

    setStudents([...students, newStudent]);
    setNewName("");
    setNewRoll("");
  };

  // ✅ Add to Favourite
  const addToFavourite = (student) => {
    setFavourites((prev) => {
      const exists = prev.some((item) => item.id === student.id);
      if (exists) return prev;
      return [...prev, student];
    });
  };

  // ✅ Remove Favourite
  const removeFromFavourite = (id) => {
    setFavourites((prev) =>
      prev.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="App">

      {/* Navbar */}
      <div className="navbar">
        <h1>EMC Class Students</h1>

        <div className="nav-buttons">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            className={page === "students" ? "active" : ""}
            onClick={() => setPage("students")}
          >
            Student List
          </button>

          <button
            className={page === "favourites" ? "active" : ""}
            onClick={() => setPage("favourites")}
          >
            Favourite Students
          </button>
        </div>
      </div>

      {/* Animated Page Content */}
      <div className="content">
        <AnimatePresence mode="wait">

          {page === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="add-box"
            >
              <h3>Add New Student</h3>

              <input
                type="text"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Enter Roll Number"
                value={newRoll}
                onChange={(e) => setNewRoll(e.target.value)}
              />

              <button onClick={addStudent}>
                Add Student
              </button>
            </motion.div>
          )}

          {page === "students" && (
            <motion.div
              key="students"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="card-container"
            >
              {students.map((student) => {
                const isAdded = favourites.some(
                  (item) => item.id === student.id
                );

                return (
                  <motion.div
                    key={student.id}
                    whileHover={{ scale: 1.05 }}
                    className="card"
                  >
                    <h2>{student.name}</h2>
                    <p>Roll No: {student.roll}</p>

                    <button
                      disabled={isAdded}
                      onClick={() => addToFavourite(student)}
                    >
                      {isAdded ? "Added" : "Add to Favourite"}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {page === "favourites" && (
            <motion.div
              key="favourites"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="card-container"
            >
              {favourites.length === 0 ? (
                <h3>No Favourite Students Yet</h3>
              ) : (
                favourites.map((student) => (
                  <motion.div
                    key={student.id}
                    whileHover={{ scale: 1.05 }}
                    className="card"
                  >
                    <h2>{student.name}</h2>
                    <p>Roll No: {student.roll}</p>

                    <button
                      onClick={() =>
                        removeFromFavourite(student.id)
                      }
                    >
                      Remove
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;