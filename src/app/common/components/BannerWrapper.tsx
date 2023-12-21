"use client";

import React from "react";
import Link from "next/link";
import { addMonths, format } from "date-fns";

import { Banner } from "../../../lib/components/banner/Banner.client";
import { useWingsContractRead } from "../../../lib/client/hooks/useWingsContractRead";
import { startdAPPDate } from "../config/date";
import { RouterSettings } from "../../router";

export const BannerWrapper = () => {
  const { data: currentEpoch, isFetched } = useWingsContractRead({
    contractName: "StabilanCore",
    functionName: "currentEpoch",
  });

  const currentTime = currentEpoch
    ? format(addMonths(startdAPPDate, Number(currentEpoch)), "MMMM, yyyy")
    : isFetched
    ? "Unable to load"
    : "Loading...";

  // if (IS_DEV_MODE) return null;

  return (
    <Banner
      headerText="Stabilan"
      bodyText={`This is test/demo version of the dAPP. Current dAPP time is: ${currentTime}`}
      action={
        <Link
          href={RouterSettings.admin}
          className="px-5 py-2 me-2 text-xs font-medium text-white bg-success rounded-3xl hover:bg-success-hover transition-colors duration-500"
        >
          Go To Admin Page
        </Link>
      }
    />
  );
};
