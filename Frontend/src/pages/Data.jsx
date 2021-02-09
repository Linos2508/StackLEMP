import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getBaseApi, inArray } from "../common/functions";
import Header from "../components/Header.jsx";
import RemoveIcon from "../Assets/images/remove-gold.svg";
import ReloadIcon from "../Assets/images/reload.svg";
import swal from "sweetalert";

export default function Data(props) {
  const [filterText, setFilterText] = useState("");
  const [data,setData] = useState([]);
  const columns = [
    {
      name: "ID Client",
      selector: "idClient",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Country",
      selector: "country",
      sortable: true,
    },
    {
      name: "Reg Information",
      selector: "insertDate",
      sortable: true,
    },
    {
      name: "Remove",
      cell: (row) => (
        <button onClick={() => deleteClient(row.idClient)}>
          <img src={RemoveIcon} alt="Remove" />
        </button>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button onClick={() => props.history.push("/client/"+ row.idClient)}>
          <img src={RemoveIcon} alt="Remove" />
        </button>
      ),
    },
  ];
  const filteredItems = data.filter((item) => {
    let a = Object.keys(item).map((element) => {
      if (
        item[element] &&
        item[element]
          .toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    if (inArray(true, a)) {
      return true;
    }
    return false;
  });

  const FilterComponent = ({ onFilter }) => (
    <article className="filterTable">
      <span>
        <button>
          <img src={ReloadIcon} alt="Reload" />
        </button>{" "}
      </span>
      <span>
        <input
          id="search"
          type="text"
          placeholder="Search"
          aria-label="Search Input"
          onChange={onFilter}
          className="searchFilter"
        />
      </span>
    </article>
  );
  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} />;
  }, []);
  const getClients = () => {
    fetch(getBaseApi() + "/manage/Leads?action=All")
    .then(res => res.json())
    .then(response => {
      if (response.result){
        setData(response.data);
      }
      else{
        swal({title: "Error", icon: "error", text:response.error})
      }
    }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
  }
  const deleteClient = (id) => {
    fetch(getBaseApi() + "/manage/Leads",{
      method: "DELETE",
      body: JSON.stringify({"idClient": id}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(response => {
      if (response.result){
        swal({title: "Success", icon: "Success", text:"Change was made correctly"})
      }
      else{
        swal({title: "Error", icon: "error", text:response.error})
      }
    }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
  }
  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <Header active="data" />
      <div className="general">
        <h1>Data</h1>
        <div className="tableContainer">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>
    </>
  );
}
