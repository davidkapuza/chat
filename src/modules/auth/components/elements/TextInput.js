import {
  FormControl,
  FormErrorMessage, Input
} from "@chakra-ui/react";
import { useField } from "formik";

const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <Input {...field} {...props} variant="outline"/>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput