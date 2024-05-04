import { Email, LocalPhone, LocationOnOutlined } from "@mui/icons-material/";
import { Chip, Stack } from "@mui/material";

export type JobProps = {
  _id: string;
  description: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string;
};

const JobBox = ({
  _id,
  description,
  title,
  company,
  location,
  email,
  phone,
}: JobProps) => {
  return (
    <div
      key={_id}
      className={`w-76 p-5 border border-solid border-gray-300 rounded-lg bg-gray-100 text-gray-600`}
    >
      <div className="text-xl font-bold">{title}</div>
      <div className="hover:text-green-400">{company}</div>
      {location && (
        <Chip
          color="primary"
          size="small"
          variant="outlined"
          label={location}
          icon={<LocationOnOutlined />}
        />
      )}
      <div className="my-2.5 truncate">{description}</div>
      <Stack direction="row" spacing={1}>
        {email && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={email}
            icon={<Email fontSize="small" />}
          />
        )}
        {phone && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            label={phone}
            icon={<LocalPhone />}
          />
        )}
      </Stack>
    </div>
  );
};

export default JobBox;
