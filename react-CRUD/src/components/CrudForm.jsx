"use client";

import React, { useState, useEffect } from "react";

let initialForm = {
    nombre: "",
    recompensa: "",
    puesto: "",
    id: null
}

export default function CrudForm({createData, updateData, dataToEdit, setDataToEdit}) {
    const [form, setForm] = useState([initialForm])

    useEffect(() => {
      if (dataToEdit) {
        setForm(dataToEdit);
      } else {
        setForm(initialForm);
      }
    }, [dataToEdit]);

    let handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }

    let handleSubmit = (e) => {
      e.preventDefault();

      if (!form.nombre || !form.recompensa || !form.puesto) {
        alert("Datos incompletos");
        return;
      }

      if (form.id === null) {
        createData(form);
      } else {
        updateData(form);
      }

      handleReset();
    }

    let handleReset = (e) => {
      setForm(initialForm);
      setDataToEdit(null);
    }

  return (
    <div>
        <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
        <form onSubmit={handleSubmit}>
            <input type='text' name='nombre' placeholder='Nombre' onChange={handleChange} value={form.nombre}></input>
            <input type='text' name='recompensa' placeholder='Recompensa' onChange={handleChange} value={form.recompensa}></input>
            <input type='text' name='puesto' placeholder='Puesto' onChange={handleChange} value={form.puesto}></input>
            <input type='submit' value="Enviar"></input>
            <input type='reset' value="Limpiar" onClick={handleReset}></input>
        </form>
    </div>
  )
}
