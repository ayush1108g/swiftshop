import React from "react";
import styles from "../components/medicineFormContainer.module.css"
// import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToLink } from "../constants.js";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface userdata {
    name: string;
    phoneno: string;
    emailid: string;
    // address: string;
}
interface pass {
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}

const UpdateDetail:React.FC = () => {
    const color = useSelector((state: RootState) => state.themeMode.color);
    const [cookie,setCookie] = useCookies(['token']);
    const [userdata, setUserdata] = useState<userdata>({ name: '', phoneno: '', emailid: ''});
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        general: '',
    });
    const [pass, setPass] = useState<pass>({ oldpassword: '', newpassword: '', confirmpassword: '' });
    const [message, setmessage] = useState<string>('');
    const [passmessage, setpassmessage] = useState<string>('');
    // const { id } = useParams();
    useEffect(() => {
        const user = async () => {
            try {
                const data = await axios.get(`${ToLink}/user/update`, {
                    headers: {
                        Authorization: `Bearer ${cookie.token}`,
                    },});
                
                const dataU = {
                    name: data.data.data.name,
                    phoneno: data.data.data.phoneno,
                    emailid: data.data.data.emailid,
                };
                setUserdata(dataU);
                setAddress(data.data.data.address);
                setmessage('');
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message)
                setmessage(err.response.data.message + ' Session Expired Please Login to Continue');
                else if (err.message) setmessage(err.message);
                else setmessage(err);
            }
        }
        user();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setUserdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // console.log(userdata);
    };
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
        const body = {...userdata, address};
        try {
              await axios.put(`${ToLink}/user/update`, body, {headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },});
            //  console.log(resp.data);
            setmessage("Updated Successfully");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message)
                    setmessage(err.response.data.message + ' Session Expired Please Login to Continue');
                else if (err.message) setmessage(err.message);
                else setmessage(err);
        }
    }
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (pass.newpassword !== pass.confirmpassword) {
            setpassmessage('new Password and Confirm Password do not match');
            return;
        }
        if(pass.newpassword.length<8){
            setpassmessage('Password should be of atleast 8 characters');
            return;
        }
        const body = {
            oldpassword: pass.oldpassword,
            newpassword: pass.newpassword
        };
        try {
           const resp = await axios.put(`${ToLink}/user/updatepassword`, body, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookie.token}`,
                },
            });
            setCookie('token',resp.data.token);
            setpassmessage("Updated Successfully");
            setPass({ oldpassword: '', newpassword: '', confirmpassword: '' });
        }
        catch (err) {
            setpassmessage(err.message);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles['medicine-form-container']} style={{color:color.text}}>
                <h2 style={{color:color.text}}>Update Details</h2>
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
                        <input type="address" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name="general"
                            value={address?.general}
                            onChange={handleAddressChange}
                            disabled={address.general === '' ? true : false}
                        />
                    </div>

                    <button onClick={handleSubmit} type="submit">Submit</button>
                </form>

                <form>
                    <div className={styles['reminder-section']}>
                        <h3 style={{color:color.text}}>Update Password</h3>
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