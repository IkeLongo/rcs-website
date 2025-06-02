import Link from "next/link";

export default function StickyBottomButton() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div
        className="w-full max-w-md px-4 pointer-events-auto flex justify-center"
        style={{
          // Only show the top half of the oval
          overflow: "hidden",
          height: "48px", // half of the button's height
        }}
      >
        <Link href="/booking" className="w-full flex justify-center">
          <button
            className="w-40 h-[96px] bg-lime-500 text-navy-500 font-bold text-base flex items-start justify-center pt-4
              rounded-t-full rounded-b-full shadow-lg hover:bg-lime-600 transition"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              borderBottomLeftRadius: "9999px",
              borderBottomRightRadius: "9999px",
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
            }}
          >
            Let's Connect
          </button>
        </Link>
      </div>
    </div>
  );
}