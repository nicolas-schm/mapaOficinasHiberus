import weAreDifferent from "@/assets/we_are_1.svg";

export function BrandTag() {
  return (
    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 sm:bottom-6 sm:left-6">
      {/* <span className="h-px w-6 bg-sky-400" /> */}
      <img
        src={weAreDifferent}
        alt="#WeAreDifferent"
        className="h-15 w-auto sm:h-20"
      />
    </div>
  );
}
