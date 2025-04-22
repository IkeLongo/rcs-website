import ScrollingOptions from "./scrolling-options"; // Adjust path based on your folder structure

export default function OptionsContainer() {

  return (
    <div className="flex justify-center w-full pt-12 bg-transparent overflow-hidden">
      <div className="flex z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
        <h3>
          Options to Suit<br className="md:hidden" /> Every Vision
        </h3>
        <ScrollingOptions />
      </div>
    </div>
  );
}