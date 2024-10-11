"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function CategoryForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();  // Use react-hook-form for form handling

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2" align="center" gutterBottom>
        Add Category
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>  {/* Wrap onSubmit with handleSubmit */}
          <div className="grid grid-cols-1 gap-4 w-fit m-4">
            <TextField
              label="Category Name"
              name="name"
              variant="outlined"
              {...register("name", { required: true })}  // Use register from react-hook-form
              fullWidth
            />

            <div className="col-span-2 mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '20px', padding: '10px 0' }}
              >
                Add Category
              </Button>
            </div>
          </div>
        </form>
      </Typography>
    </Box>
  );
}
