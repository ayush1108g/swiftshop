import React from "react";
import styles from "../components/medicineFormContainer.module.css"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToLink } from "../constants.js";

interface userdata {
    name: string;
    phoneno: string;
    emailid: string;
    address: string;
}
interface pass {
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}

const UpdateDetail:React.FC = () => {
    const [userdata, setUserdata] = useState<userdata>({ name: '', phoneno: '', emailid: '', address: '' });
    const [pass, setPass] = useState<pass>({ oldpassword: '', newpassword: '', confirmpassword: '' });
    const [message, setmessage] = useState<string>('');
    const [passmessage, setpassmessage] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const user = async () => {
            try {
                const data = await axios.get(`${ToLink}/user/${id}/update`);
                setUserdata(data.data.data);
                setmessage('');
            } catch (err) {
                setmessage(err.message);
            }
        }
        user();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setUserdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // console.log(userdata);
    };
    const handlepassChange = (e) => {
        const { name, value } = e.target;
        setPass((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = userdata;
        try {
             await axios.put(`${ToLink}/user/${id}/update`, body);
            setmessage("Updated Successfully");
        } catch (err) {
            setmessage(err.message);
        }
    }
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (pass.newpassword !== pass.confirmpassword) {
            setpassmessage('new Password and Confirm Password do not match');
            return;
        }
        const body = {
            oldpassword: pass.oldpassword,
            newpassword: pass.newpassword
        };
        try {
            await axios.put(`${ToLink}/user/${id}/updatepassword`, body);
            setpassmessage("Updated Successfully");
        }
        catch (err) {
            setmessage(err.message);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles['medicine-form-container']}>
                <h2>Update Details</h2>
                <form >
                    <div>{message}</div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="name"
                            value={userdata.name}
                            onChange={handleInputChange}
                            disabled={userdata.name === '' ? true : false}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Phone Number</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="phoneno"
                            value={userdata.phoneno}
                            onChange={handleInputChange}
                            disabled={userdata.phoneno === '' ? true : false}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Email id</span>
                        <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="emailid"
                            value={userdata.emailid}
                            onChange={handleInputChange}
                            disabled={userdata.emailid === '' ? true : false}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                        <input type="address" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="address"
                            value={userdata.address}
                            onChange={handleInputChange}
                            disabled={userdata.address === '' ? true : false}
                        />
                    </div>

                    <button onClick={handleSubmit} type="submit">Submit</button>
                </form>

                <form>
                    <div className={styles['reminder-section']}>
                        <h3>Update Password</h3>
                        <div>{passmessage}</div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Old Password</span>
                            <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="oldpassword" value={pass.oldpassword} onChange={handlepassChange} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">New Password</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="newpassword" value={pass.newpassword} onChange={handlepassChange} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Confirm Password</span>
                            <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="confirmpassword" value={pass.confirmpassword} onChange={handlepassChange} />
                        </div>
                    </div>
                    <button onClick={handleSubmitPassword} type="submit">Update Password</button>
                </form>

            </div>
        </div>
    );
};
export default UpdateDetail;