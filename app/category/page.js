"use client";
import { useState, useEffect } from "react";
import CategoryForm from "@/app/components/forms/CategoryForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEditCategory(params.row)}
            aria-label="edit"
          >
            <EditIcon fontSize="medium" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteCategory(params.row._id)}
            aria-label="delete"
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    const data = await fetch("/api/category");
    const categories = await data.json();
    const formattedCategories = categories.map((category) => ({
      ...category,
      id: category._id,
    }));
    setCategory(formattedCategories);
  }

  const handleOpen = () => {
    setEditMode(false);
    setCurrentCategory(null);
    setOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setCurrentCategory(category);
    setOpen(true);
  };

  function handleCategoryFormSubmit(data) {
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `/api/category/${currentCategory._id}`
      : `/api/category`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchCategory();
      setOpen(false);
    });
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      fetch(`/api/category/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchCategory();
      });
    }
  };

  return (
    <main>
      <div className="mx-4 my-4">
        <span>Category ({category.length})</span>
        <IconButton aria-label="new-category" color="primary" onClick={handleOpen}>
          <AddBoxIcon fontSize="large" />
        </IconButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CategoryForm onSubmit={handleCategoryFormSubmit} />
        </Modal>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={category}
          columns={columns}
          onRowClick={(params) => handleEditCategory(params.row)}
        />
      </div>
    </main>
  );
}
