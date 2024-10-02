"use client";

import React, { useEffect, useState } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import { helpHttp } from '@/helpers/helpHttps';
import Loader from './Loader';

export const CrudApp = () => { 

    let [db, setDb] = useState({})
    let [loader, setLoader] = useState(true)
    let [dataToEdit, setDataToEdit] = useState(null);

    let url = "http://localhost:5000/mugiwaras";

    useEffect(() => {
        setLoader(true);
        helpHttp().get(url).then(res => {
            if(!res.err){
                setDb(res)
            } else{
                setDb(null)
            }
            setLoader(false);
        })
    }, [])

    let createData = (data) => {
        data.id = Date.now().toString;
    
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
    
        helpHttp().post(url, options).then((res) => {
          if (!res.err) {
            setDb([...db, res]);
          } else {
            alert(err)
          }
        });
      };

    let updateData = (data) => {
        let endpoint = `${url}/${data.id}`;
    
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
    
        helpHttp().put(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = db.map((el) => (el.id === data.id ? data : el));
            setDb(newData);
          } else {
            alert(err)
          }
        });
      };

    let deleteData = (id) => {
        let isDelete = window.confirm(
          `¿Estás seguro de eliminar el registro con el id '${id}'?`
        );
    
        if (isDelete) {
          let endpoint = `${url}/${id}`;
          let options = {
            headers: { "content-type": "application/json" },
          };
    
          helpHttp().del(endpoint, options).then((res) => {
            if (!res.err) {
              let newData = db.filter((el) => el.id !== id);
              setDb(newData);
            } else {
                alert(res)
            }
          });
        } else {
          return;
        }
    };
     

  return (
    <div>
        <h2>CRUD APP</h2>
        <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
        {loader && <Loader/>}
        {db && (
            <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>
        )}
        
    </div>
  )
}
