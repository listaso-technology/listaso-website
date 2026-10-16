import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import {
  RatingPublishedReviews,
  RatingReviewForm,
  RatingSnapshot,
} from "@/components/sections/company/RatingSections";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { NextPage } from "@/components/sections/variants/NextPage";
import { hero, metadata as content } from "@/content/company/rating";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(content);

export default function RatingPage() {
  return (
    <>
      <HeroDossier content={hero} aside={<RatingSnapshot />} />
      <RatingReviewForm />
      <RatingPublishedReviews />
      <NextPage group="Company" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
