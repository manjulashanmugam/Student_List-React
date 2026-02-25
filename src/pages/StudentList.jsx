import React, { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function StudentList() {
  const { favourites, addToFavourite } = useContext(StudentContext);

  const students = [
    { id: 1, name: "Arun", roll: "101" },
    { id: 2, name: "Divya", roll: "102" },
    { id: 3, name: "Karthik", roll: "103" },
    { id: 4, name: "Priya", roll: "104" },
  ];

  return (
    <div className="content">
      <h2>Student List</h2>
      <div className="card-container">
        {students.map((student) => {
          const isFavourite = favourites.some(
            (fav) => fav.id === student.id
          );

          return (
            <div className="card" key={student.id}>
              <h3>{student.name}</h3>
              <p>Roll No: {student.roll}</p>

              <button
                disabled={isFavourite}
                onClick={() => addToFavourite(student)}
              >
                {isFavourite ? "Added ✅" : "Add to Favourite"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentList;