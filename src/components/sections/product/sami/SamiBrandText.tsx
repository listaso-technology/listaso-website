/** Apply the SAMI wordmark styling inside otherwise plain editorial copy. */
export function SamiBrandText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(SAMI AI Assistant|SAMI)/g).map((part, index) =>
        part === "SAMI" || part === "SAMI AI Assistant" ? (
          <span className="samiBrandName" key={`${part}-${index}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
