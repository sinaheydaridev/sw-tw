import { useFormik as useForm } from "formik";
import { useState } from "react";

const useWhatsHappingData = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(tweet);
  };

  const { values } = useForm({
    initialValues: {},
    validationSchema: {},
    onSubmit: (e) => {},
  });

  return { onSubmit, setTweet, tweet };
};

export { useWhatsHappingData };
