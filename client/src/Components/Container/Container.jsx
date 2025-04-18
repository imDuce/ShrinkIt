import React, { useEffect, useState } from 'react'
import FormContainer from '../FormContainer/FormContainer'
import { serverUrl } from '../../helpers/constants'
import axios from 'axios'
import DatTable from '../DataTable/DatTable'

const Container = () => {
  const [data, setData] = useState([])
  const [reload , setReload] = useState(false)

  const updateReloadState=()=>{
    setReload(true)
  }

  const fetchTableData =async ()=>{
    const response = await axios.get(`${serverUrl}/shortUrl`)
    console.log("Response form server : ",response);
    setData(response.data)
    setReload(false)
    // console.log(data[0]);
    
  }

  useEffect(()=>{
    fetchTableData();
  },[reload])
  return (
    <div>
    <FormContainer updateReloadState={updateReloadState} />
    <DatTable updateReloadState={updateReloadState} data={data} />
    </div>
  )
}

export default Container
