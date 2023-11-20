import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Textarea, Text } from "@mantine/core";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useContactRenterMutation,
  useGetTransactionsQuery,
} from "../../store/api/PropertySlice";
import { useGetUserQuery } from "../../store/api/UserSlice";

function ContactRenterContent() {
  const { data: transactions = [] } = useGetTransactionsQuery();
  const { data: user = {} } = useGetUserQuery();
  const [contactRenter] = useContactRenterMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  const transaction = transactions.find((trns) => trns && trns._id === id);

  const form = useForm({
    initialValues: {
      propertyTitle: transaction?.request?.property?.title || "",
      name: user.name || "",
      email: user.email || "",
      message: "",
    },
    validate: {
      name: (value) => !value.trim() && "Invalid name",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      message: (value) => !value.trim() && "Message cannot be empty",
    },
  });

  useEffect(() => {
    if (id && transaction?.length > 0) {
      const selectedTransaction = transactions.find(
        (trns) => trns && trns._id === id
      );
      form.setValues({
        propertyTitle: selectedTransaction?.request?.property?.title || "",
        name: user?.name || "",
        email: user?.email || "",
        message: "",
      });
    }
  }, [id, transaction, user]);

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      contactRenter({
        from_name: form.values.name,
        from_email: form.values.email,
        to_name: transaction.request.sender.name,
        to_email: transaction.request.sender.email,
        property_title: transaction.request.property.title,
        message: form.values.message,
      })
        .unwrap()
        .then((result) => {
          toast.success(result.message);
          navigate(`/`);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  };

  return (
    <div className="w-full md:w-2/4 xl:w-1/3 p-6 sm:p-8 rounded-lg flex flex-col shadow-[0px_0px_6px_rgb(0,0,0,0.1)]">
      <h2 className="text-3xl font-medium text-center">Contact Renter</h2>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Please send a message to the property renter
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Property Title"
          placeholder="Property title"
          mt="md"
          size="md"
          {...form.getInputProps("propertyTitle")}
        />
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter your name"
          mt="md"
          size="md"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          mt="md"
          size="md"
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />

        <Textarea
          withAsterisk
          mt="md"
          size="md"
          label="Message"
          placeholder="Enter your message"
          {...form.getInputProps("message")}
        />

        <button className="mt-6 w-full bg-primaryColor bg-opacity-90 hover:bg-opacity-100 px-4 py-3 text-sm flex items-center justify-center rounded-xl text-white duration-100 ">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactRenterContent;
