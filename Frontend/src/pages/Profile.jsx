import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import "../styles/Profile.scss";
import {useParams} from "react-router-dom";
import { getBaseApi } from "../common/functions.js";
import swal from "sweetalert";

export default function Profile(props) {
  const [action,setAction] = useState("");
  const [client,setClient] = useState({});
  const {id} = useParams();
  const renderOptions = () => {
    let options = []
    let catalogue = [
      {id:1,name:"New"},
      {id:2,name:"Client"},
      {id:3,name:"High Potential"},
      {id:4,name:"Low Potential"},
    ]
    options.push(catalogue.map((item) => {
      return ( 
        <option value={item.id} key={"statuses"+item.id}>{item.name}</option>
      )
    }))
    return options;
  }
  const getClient = (id) => {
    fetch(getBaseApi() + "/manage/Leads?action=ById&id="+id)
    .then(res => res.json())
    .then(response => {
      if (response.result){
        setClient(response.data);
      }
      else{
        swal({title: "Error", icon: "error", text:response.error})
      }
    }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
  }
  const submitFormClient = (e) => {
    e.preventDefault();
    let data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phoneNumber: e.target[2].value,
      email: e.target[3].value,
      age: e.target[4].value,
      leadStatus: e.target[5].value,
      street: e.target[6].value,
      aditionalInformation: e.target[7].value,
      city: e.target[8].value,
      state: e.target[9].value,
      zipCode: e.target[10].value,
      country: e.target[11].value,
      idClient: id,
    }
    fetch(getBaseApi() + "/manage/Leads",{
      method: action,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(response => {
      if (response.result){
        swal({title: "Success", icon: "success", text:"Change was made correctly"})
      }
      else{
        swal({title: "Error", icon: "error", text:response.error})
      }
    }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
  }
  useEffect(() => {
    if(id){
      setAction("PUT");
      getClient(id);
    }
    else{
      setAction("POST");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <Header active="profile" />
      <div className="general">
        <h1>Profile Page</h1>
        <form className="information" onSubmit={e => submitFormClient(e)}>
          <div className="generalInfo">
            <h2>General Information</h2>
            <div className="generalData">
              <article>
                <label htmlFor="firstName">First Name</label>
                <input type="text" defaultValue={client.firstName} name="firstName" id="firstName" required/>
              </article>
              <article>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" defaultValue={client.lastName} name="lastName" id="lastName" required/>
              </article>
              <article>
                <label htmlFor="phoneNumber">Phone</label>
                <input type="text" defaultValue={client.phoneNumber} name="phoneNumber" id="phoneNumber" required/>
              </article>
              <article>
                <label htmlFor="email">Email</label>
                <input type="email" defaultValue={client.email} name="email" id="email" required/>
              </article>
              <article>
                <label htmlFor="age">Age</label>
                <input type="number" min="0" defaultValue={client.age} name="age" id="age" required/>
              </article>
              <article>
                <label htmlFor="leadStatus">Lead Status</label>
                <select type="text" defaultValue={client.idLeadStatus} name="leadStatus" id="leadStatus" required>
                  <option value="">Choose</option>
                  {renderOptions()}
                </select>
              </article>
            </div>
          </div>
          <div className="additionalInfo">
            <h2>Address</h2>
            <div className="additionalData">
              <article>
                <label htmlFor="street">Street</label>
                <input type="text" defaultValue={client.street} name="street" id="street" required/>
              </article>
              <article>
                <label htmlFor="additionalInfo">Additional Info</label>
                <input type="text" defaultValue={client.aditionalInformation} name="additionalInfo" id="additionalInfo" required/>
              </article>
              <article>
                <label htmlFor="city">City</label>
                <input type="text" defaultValue={client.city} name="city" id="city" required/>
              </article>
              <article>
                <label htmlFor="state">State/Province</label>
                <input type="text" defaultValue={client.state} name="state" id="state" required/>
              </article>
              <article>
                <label htmlFor="zipCode">ZIP/Postal Code</label>
                <input type="text" defaultValue={client.zipCode} name="zipCode" id="zipCode" required/>
              </article>
              <article>
                <label htmlFor="country">Country</label>
                <input type="text" defaultValue={client.country} name="country" id="country" required/>
              </article>
            </div>
          </div>
          <div className="saveButton">
            <button>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
