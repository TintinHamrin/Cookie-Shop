import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Register.scss";
import { Button } from "@mui/material";
import { ApiClient } from "./ApiClient";
import { useState } from "react";

export default function BasicTextFields() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nameInputHandler = (e: any) => {
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const register = () => {
    ApiClient.fetch("/register", {
      method: "POST",
      body: JSON.stringify({ name: username, password: password }),
    }).then((res) => console.log(res.json()));
  };

  return (
    <Box
      className="form"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      //noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => {
          nameInputHandler(e);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => {
          passwordInputHandler(e);
        }}
      />
      <Button sx={{ color: "secondary.main" }} onClick={register}>
        Click to Log in
      </Button>
    </Box>
  );
}
