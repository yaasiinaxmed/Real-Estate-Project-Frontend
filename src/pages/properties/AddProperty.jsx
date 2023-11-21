import React from "react";
import AddPropertyContent from "../../components/propertyContent/AddPropertyContent";
import { Text, Title } from "@mantine/core";

function AddProperty() {
  return (
    <section className="py-[8rem]">
      <div className="container flex flex-col items-center justify-center">
        {/* Title */}
        <div className="my-4">
          <Title ta="center">Add Property</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Add new property details 
          </Text>
        </div>
        <AddPropertyContent />
      </div>
    </section>
  );
}

export default AddProperty;
