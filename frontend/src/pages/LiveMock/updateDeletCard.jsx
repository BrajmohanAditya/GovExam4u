import React, { useEffect, useState } from "react";
import { AddCardStyle } from "./style";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import httpAction from "../user/utils/httpAction";
import apis from "./apis";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDeleteCard = () => {
  const { id } = useParams(); // get id from url which have rendered UpdateDeletCard component
  const navigate = useNavigate();

  const [initialState, setInitialState] = useState({
    name: "",
    exam: "",
    link: "",
    date: "",
  });

  // VALIDATION
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    exam: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
  });

  // FETCH CARD DATA FROM BACKEND
  const fetchCard = async () => {
    const data = {
      url: apis().bringCard(id),
      method: "GET",
    };

    const result = await httpAction(data);

    if (result?.status) {
      // yaha form ko fill kar dikha raha hain
      setInitialState({
        name: result.data.name,
        exam: result.data.exam,
        link: result.data.link,
        date: result.data.date,
      });
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  // UPDATE CARD
  const submitHandler = async (values) => {
    const data = {
      url: apis().updateCard(id),
      method: "PUT",
      body: values,
    };

    const result = await httpAction(data);
    if (result?.status) {
      toast.success("Card Updated Successfully");
      navigate("/livemock");
    }
  };

  // DELETE CARD
  const deleteHandler = async () => {
    const data = {
      url: apis().deleteCard(id),
      method: "DELETE",
    };

    const result = await httpAction(data);
    if (result?.status) {
      toast.success("Card Deleted");
      navigate("/livemock");
    }
  };

  return (
    <div className={AddCardStyle.mock_card}>
      <Formik
        enableReinitialize={true} // very important
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ handleChange, handleBlur, touched, errors, values }) => (
          <Form>
            <div className={AddCardStyle.row}>
              <h3 className={AddCardStyle.h3}>Update Today Live Mock</h3>

              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                label="Portal Name"
                fullWidth
                size="small"
              />

              <TextField
                name="exam"
                value={values.exam}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.exam && Boolean(errors.exam)}
                helperText={touched.exam && errors.exam}
                label="Exam Name"
                fullWidth
                size="small"
              />

              <TextField
                name="link"
                value={values.link}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.link && Boolean(errors.link)}
                helperText={touched.link && errors.link}
                label="Exam Link"
                fullWidth
                size="small"
              />

              <TextField
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                label="Last Date"
                fullWidth
                size="small"
              />

              <div className="flex justify-center gap-3">
                <Button variant="contained" type="submit">
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteHandler}
                  type="button"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateDeleteCard;
