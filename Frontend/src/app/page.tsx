import HomePage from "./components/home/HomePage";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";

const Page = () => {
  const queryClient = getQueryClient();

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage />
      </HydrationBoundary>
    </>
  );
};

export default Page;
