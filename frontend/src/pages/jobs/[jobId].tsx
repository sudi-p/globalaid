import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobStart } from "@store/slices/JobSlice";
import { useRouter } from "next/router";

const Job = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const jobData = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(fetchJobStart());
  }, []);
  const goBack = function () {
    router.back();
  };
  const { status, job } = jobData;
  const { id, position, company, salary } = job;
  return (
    <div className={styles.job}>
      <div
        onClick={() => goBack()}
        className="cursor-pointer width-max p-2 text-white"
      >
        Back
      </div>
      Job Page
      <div className="font-bold">{position}</div>
    </div>
  );
};

export default Job;
