import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, HTMLAttributes, SelectHTMLAttributes, useState } from "react"

type CreateJobProps = {
  company: string,
  jobType: string,
  location: string,
  salary: string,
  jobSite: string,
  email: string,
  phone: string,
  isOwner: boolean,
}

export const useCreateJob = (initialData: CreateJobProps) => {
  const [data, setData] = useState(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name as string]: value }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name as string]: value }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked} = e.target  as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: checked }));
  };
  return {data, handleChange, handleSelectChange, handleCheckboxChange};
}
