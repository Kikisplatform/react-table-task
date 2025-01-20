import React from "react";
import { useForm } from "react-hook-form";
import { addData } from "../store/tableSlice";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <br />
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Age:</label>
        <br />
        <input
          type="number"
          {...register("age", { required: "Age is required" })}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div>
        <label>Country:</label>
        <br />
        <input
          type="text"
          {...register("country", { required: "Country is required" })}
        />
        {errors.country && <span>{errors.country.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
