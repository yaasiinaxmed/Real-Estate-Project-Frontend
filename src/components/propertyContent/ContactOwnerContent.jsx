import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Textarea, Text } from "@mantine/core";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useContactOwnerMutation,
  useGetPropertiesQuery,
} from "../../store/api/PropertySlice";
import { useGetUserQuery } from "../../store/api/UserSlice";

function ContactOwnerContent() {
  const { data: properties = [] } = useGetPropertiesQuery();
  const { data: user = {} } = useGetUserQuery();
  const [contact] = useContactOwnerMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((pro) => pro && pro._id === id);

  const form = useForm({
    initialValues: {
      propertyTitle: property?.title || "",
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
    if (id && properties.length > 0) {
      const selectedProperty = properties.find((pro) => pro && pro._id === id);
      form.setValues({
        propertyTitle: selectedProperty?.title || "",
        name: user?.name || "",
        email: user?.email || "",
        message: "",
      });
    }
  }, [id, properties, user]);

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      contact({
        from_name: form.values.name,
        from_email: form.values.email,
        to_name: property.owner.name,
        to_email: property.owner.email,
        property_title: property.title,
        message: form.values.message,
      })
        .unwrap()
        .then((result) => {
          toast.success(result.message);
          navigate(
            `/property/${property._id}/${property.title
              .toLowerCase()
              .split(" ")
              .join("-")}`
          );
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  };

  return (
    <div className="w-full md:w-2/4 xl:w-1/3 p-6 sm:p-8 rounded-lg flex flex-col shadow-[0px_0px_6px_rgb(0,0,0,0.1)]">
      <h2 className="text-3xl font-medium text-center">Contact Owner</h2>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Please send a message to the property owner
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

export default ContactOwnerContent;
