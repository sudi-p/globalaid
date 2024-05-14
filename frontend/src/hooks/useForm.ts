import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react"

type InitialDataProps = {
  [key: string] : string | null | number | boolean,
}
export const useForm = (initialData: InitialDataProps) => {
  const [ formData, setFormData ] = useState(initialData);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {...prev, [name]:value}
    })
  }
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked} = e.target  as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  return {formData, handleTextChange, handleSelectChange, handleCheckboxChange}
}