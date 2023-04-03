import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
import { collection, updateDoc, getDocs, doc, get } from 'firebase/firestore';
import { db } from '../../Firebase-config';
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';

export default function Edit({ fid, closeEvent }) {
  const [state, setState] = useState("");
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "state");
  useEffect(() => {
    console.log("FID:" + fid.id);
    setState(fid.State);

  }, []);
  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const createUser = async () => {
    const userDoc = doc(db, "state", fid.id);
    const newFields = {
     state:state,
    };
    await updateDoc(userDoc, newFields);
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been updated", "success")

  };
  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant='h5' align='center'>
        Edit State
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label=" State"
            variant="outlined"
            type="text"
            size='small'
            onChange={handleStateChange}
            value={state}
            sx={{ minWidth: "100%" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
            <Button variant='contained' onClick={createUser}>
              Update
            </Button>
          </Typography>

        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }} />
    </>
  );
}