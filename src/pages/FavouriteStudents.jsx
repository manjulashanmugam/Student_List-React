import React, { useContext } from "react";
import { StudentContext } from "../context/StudentContext";

function FavouriteStudents() {
  const { favourites, removeFromFavourite } =
    useContext(StudentContext);

  return (
    <div className="content">
      <h2>Favourite Students</h2>

      {favourites.length === 0 ? (
        <p>No favourite students added.</p>
      ) : (
        <div className="card-container">
          {favourites.map((student) => (
            <div className="card" key={student.id}>
              <h3>{student.name}</h3>
              <p>Roll No: {student.roll}</p>

              <button onClick={() => removeFromFavourite(student.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouriteStudents;