import { useEffect, useState } from "react";
import "./App.css";
import StudentList from "./components/StudentList/StudentList";
import { Loading } from "./components/Loading/Loading";
import { Error } from "./components/Error/Error";

// TODO: Get this value from .env
const API_URL = "http://localhost:8888";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("<App /> useEffect() fired");
    async function fetchData() {
      try {
        // You can await here
        setLoading(true);
        const response = await fetch(`${API_URL}/students`);
        const json = await response.json();
        // console.log("<App /> useEffect() fetched data", json);
        const { data, error } = json;
        if (response.ok) {
          //handle success
          setStudentData(data);
          setLoading(false);
        } else {
          setError(error.message);
          setLoading(false);
        }
      } catch (err) {
        console.error(err.message);

        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // console.log(`<App /> rendered! num students = ${studentData.length}`);

  const renderContent = () => {
    /*if loading return <Loading />
      else render <StudentList /> */

    /* If we want to load something or nothing we use:
      {lading && <Loading />} */

    /* If we want to load a or b: use a*/

    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error error={error} />;
    } else {
      return <StudentList studentData={studentData} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
}

export default App;
