import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalStatus } from "../../../components/context/GlobalStatusContext.jsx";
import { toast } from "react-toastify";
import "../../../css/Form.css";

function AddCategory() {
  const navigate = useNavigate();

  const { setIsLoading, isSubmitting, setIsSubmitting } = useGlobalStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/categories", data);
      navigate("/my-expense-categories");
      reset();
      toast.success("Category added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="expense-tracker-form">
        <h1>Add New Category</h1>

        <label htmlFor="emoji" className="form-label">
          Emoji
        </label>
        <input
          {...register("emoji", {
            required: true,
          })}
          className="form-input"
        />
        {errors.emoji?.type === "required" && (
          <span className="form-error">Emoji is required</span>
        )}

        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 16,
          })}
          className="form-input"
        />
        {errors.name?.type === "required" && (
          <span className="form-error">Name is required</span>
        )}
        {errors.name?.type === "minLength" && (
          <span className="form-error">Name must be at least 3 characters</span>
        )}
        {errors.name?.type === "maxLength" && (
          <span className="form-error">Name must be at most 16 characters</span>
        )}

        <label htmlFor="budget" className="form-label">
          Budget
        </label>
        <input
          {...register("budget", {
            required: true,
            pattern: /^\d+$/,
          })}
          className="form-input"
        />
        {errors.budget?.type === "required" && (
          <span className="form-error">Budget is required</span>
        )}
        {errors.budget?.type === "pattern" && (
          <span className="form-error">Budget must be a number</span>
        )}

        {/* <label htmlFor="description" className="form-label">
          Description / Notes
        </label>
        <textarea
          {...register("description")}
          className="form-input no-resize"
          rows={3}
          maxLength={128}
          placeholder="E.g. Food category can include food, drinks, groceries, eating out, etc."
        /> */}

        <br />
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Adding..." : "Add Category"}
          className="form-submit"
        />
      </form>
    </div>
  );
}

export default AddCategory;
