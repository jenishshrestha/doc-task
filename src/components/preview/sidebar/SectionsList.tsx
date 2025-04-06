"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "@/store/sections/sectionsSlice";

const SectionsList: React.FC = () => {
  const data = useSelector((state) => console.log(state));

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Sections Component</h2>
    </div>
  );
};

export default SectionsList;
