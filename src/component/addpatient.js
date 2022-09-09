import "../App.css";
import { useState } from "react";

function AddPatient() {
    const [formdata, setFormdata] = useState({});
    const [fname, setFname] = useState({});
    const [lname, setLname] = useState({});
    const [age, setAge] = useState({});
    const [gender, setGender] = useState({});
    return (
        <>
            <div className="patient-form">
                <form>
                    <label for="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                        onChange={function (event) {
                            setFname(event.target.value);
                            console.log(event.target.value);
                            setFormdata({ [event.target.name]: event.target.value });
                        }}
                    />
                    <label for="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Your last name.."
                        onChange={function (event) {
                            console.log(event.target.value);
                            setLname(event.target.value);
                            setFormdata({ [event.target.name]: event.target.value });
                        }}
                    />
                    <label for="lname">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Your Age.."
                        onChange={function (event) {
                            setAge(event.target.value);
                            setFormdata({ [event.target.name]: event.target.value });
                            console.log(formdata);
                        }}
                    />
                    <div onChange={function (event) {
                        console.log(event.target.value);
                        setGender(event.target.value);
                        setFormdata({ [event.target.name]: event.target.value });
                    }}>
                        <input type="radio" name="gender" value="male" /> Male
                        <input type="radio" name="gender" value="female" /> Female
                    </div>

                    <br />
                    <button
                        onClick={function (event) {
                            console.log(formdata)
                            event.preventDefault();
                            var userdata = new FormData();
                            userdata.append("fname", fname);
                            userdata.append("lname", lname);
                            userdata.append("age", age);
                            userdata.append("gender", gender);
                            fetch("http://localhost:3003/store-data", {
                                method: "POST",
                                // We convert the React state to JSON and send it as the POST body
                                body: userdata,
                            }).then(function (response) {
                                console.log(response.status);
                                if (response.status) {
                                    window.location.reload();
                                }
                            });
                        }}
                    >
                        Add Patient
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddPatient;
