const formSerializer = (form) => {
  const formData = {
    id: form.id,
    name: form.name,
    displayName: form.displayName,
    submitButtonText: form.submitButtonText,
    responseMessage: form.responseMessage,
    description: form.description,
    fields: form.fields,
    createdAt: form.createdAt.getTime(),
    updatedAt: form.updatedAt.getTime(),
  };

  return formData;
};

export default formSerializer;
