import { useEffect, useState } from "react";

function PatientData(props) {
  const [data, SetData] = useState([]);
  const [search, setSearch] = useState("");
  const [issearch, setIssearch] = useState(false);
  const GetUserData = async () => {
    const response = await fetch("http://localhost:3003");
    const jsondata = await response.json();
    console.log(jsondata)
    SetData(jsondata);
  };
  useEffect(function () {
    GetUserData();
  }, []);
  return (
    <>
      <div className="serchbar">
        <form id="form">
          <input
            type="search"
            className="search-input"
            name="search"
            placeholder="Search..."
            onChange={function (event) {
              setSearch(event.target.value);
              console.log(search);
            }}
          />
          <button
            onClick={function (event) {
              event.preventDefault();
              setIssearch(true)
              var searchdata = new FormData();
              searchdata.append("search", search);
              fetch("http://localhost:3003/search", {
                method: "POST",
                // We convert the React state to JSON and send it as the POST body
                body: searchdata,
              }).then(async function (response) {
                const jsondata = await response.json();
                console.log(jsondata);
                SetData(jsondata)
              });
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="users-table-container">
        <table className="users-table">
          <thead className="users-table__head">
            <tr>
              <th>#</th>
              <th>FName</th>
              <th>LName</th>
              <th>Age</th>
              <th>Gender</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="users-table__body">
            {data.map((curel) => (
              <tr key={curel.id}>
                <td>{curel.id}</td>
                <td>
                  <p>{curel.fname}</p>
                </td>
                <td>
                  <p>{curel.lname}</p>
                </td>
                <td>
                  <p>{curel.age}</p>
                </td>
                <td>
                  <p>{curel.gender}</p>
                </td>
              </tr>
            ))}
            {!data.length && (
              <tr>
                <td colSpan={4}>No users....</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientData;
