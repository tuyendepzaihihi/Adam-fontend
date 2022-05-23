import { Button } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { setToken } from "../app/service/StorageService";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
export default PublicRoute;

const Home = () => {
  return (
    <div>
      <Button
        onClick={() => {
          setToken("");
        }}
        title="out"
        variant="outlined"
      >
        out
      </Button>
    </div>
  );
};
