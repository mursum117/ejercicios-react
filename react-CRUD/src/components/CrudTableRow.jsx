"use client";

import React from 'react'

export default function CrudTableRow({el, setDataToEdit, deleteData}) {
  let{nombre, recompensa, puesto, id} = el
  return (
    <tr>
        <td>{nombre}</td>
        <td>{recompensa}</td>
        <td>{puesto}</td>
        <td>
            <button onClick={() => setDataToEdit(el)}>Editar</button>
            <button onClick={() => deleteData(id)}>Eliminar</button>
        </td>
    </tr>
  )
}
