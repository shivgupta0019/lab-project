// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import CentrallLabTable from './CentrallLabTable';

// export default function CentrallabPage() {
//   const [records, setRecords] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("centrallab")) || [];
//     setRecords(stored);
//   }, [location]);

//   function handleDelete(index) {
//     const confirmDelete = window.confirm("Are you sure you want to delete this record?");

//     if (confirmDelete) {
//       const updated = records.filter((_, i) => i !== index);
//       setRecords(updated);
//       localStorage.setItem("centrallab", JSON.stringify(updated));
//     }
//   }

//   return (
//     <CentrallLabTable
//       records={records}
//       handleDelete={handleDelete}
//     />
//   )
// }


// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import CentrallLabTable from './CentrallLabTable';
// import axios from 'axios';

// export default function CentrallabPage() {
//   const [records, setRecords] = useState([]);
//   const location = useLocation();

//   async function fetchData() {
//     try {
//       const res = await axios.get("http://localhost:5000/api/labs");
//       setRecords(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [location]);

//   async function handleDelete(id) {
//     const confirmDelete = window.confirm("Are you sure you want to delete this record?");

//    if (confirmDelete) {
//       await axios.delete(`http://localhost:5000/api/labs/${id}`);
//       fetchData(); // refresh
//     }
//   }

//   return (
//     <CentrallLabTable
//       records={records}
//       handleDelete={handleDelete}
//        refreshTable={fetchData}
       
//     />
//   )
// }




import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CentrallLabTable from './CentrallLabTable';


export default function CentrallabPage() {
  const [records, setRecords] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("centrallab")) || [];
    setRecords(stored);
  }, [location]);

  function handleDelete(index) {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");

    if (confirmDelete) {
      const updated = records.filter((_, i) => i !== index);
      setRecords(updated);
      localStorage.setItem("centrallab", JSON.stringify(updated));
    }
  }

  return (
    <>
    <CentrallLabTable
      records={records}
      handleDelete={handleDelete}
    />
    
    </>
  )
}
