import React from "react";
import EditPropertyContent from "../../components/propertyContent/EditPropertyContent";
import { Text, Title } from "@mantine/core";

function EditProperty() {
  return (
    <section className="py-[5rem]">
      <div className="container flex flex-col items-center justify-center">
        {/* Title */}
        <div className="my-4">
          <Title ta="center">Edit Property</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Update property details 
          </Text>
        </div>
        <EditPropertyContent />
      </div>
    </section>
  );
}

export default EditProperty;