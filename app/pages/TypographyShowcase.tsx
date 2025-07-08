import React from 'react';

export default function TypographyShowcase() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Typography Showcase with Tailwind CSS</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Headings</h2>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Heading 1 (text-5xl)</h1>
          <h2 className="text-4xl font-bold text-gray-900">Heading 2 (text-4xl)</h2>
          <h3 className="text-3xl font-bold text-gray-900">Heading 3 (text-3xl)</h3>
          <h4 className="text-2xl font-bold text-gray-900">Heading 4 (text-2xl)</h4>
          <h5 className="text-xl font-bold text-gray-900">Heading 5 (text-xl)</h5>
          <h6 className="text-lg font-bold text-gray-900">Heading 6 (text-lg)</h6>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Font Weights</h2>
        <div className="space-y-2">
          <p className="font-thin text-lg">This text is thin (font-thin)</p>
          <p className="font-extralight text-lg">This text is extra light (font-extralight)</p>
          <p className="font-light text-lg">This text is light (font-light)</p>
          <p className="font-normal text-lg">This text is normal (font-normal)</p>
          <p className="font-medium text-lg">This text is medium (font-medium)</p>
          <p className="font-semibold text-lg">This text is semibold (font-semibold)</p>
          <p className="font-bold text-lg">This text is bold (font-bold)</p>
          <p className="font-extrabold text-lg">This text is extra bold (font-extrabold)</p>
          <p className="font-black text-lg">This text is black (font-black)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Sizes</h2>
        <div className="space-y-2">
          <p className="text-xs">This is extra small text (text-xs)</p>
          <p className="text-sm">This is small text (text-sm)</p>
          <p className="text-base">This is base text (text-base)</p>
          <p className="text-lg">This is large text (text-lg)</p>
          <p className="text-xl">This is extra large text (text-xl)</p>
          <p className="text-2xl">This is 2xl text (text-2xl)</p>
          <p className="text-3xl">This is 3xl text (text-3xl)</p>
          <p className="text-4xl">This is 4xl text (text-4xl)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-900">Gray 900 (text-gray-900)</p>
          <p className="text-gray-700">Gray 700 (text-gray-700)</p>
          <p className="text-gray-500">Gray 500 (text-gray-500)</p>
          <p className="text-gray-300">Gray 300 (text-gray-300)</p>
          <p className="text-blue-600">Blue 600 (text-blue-600)</p>
          <p className="text-red-600">Red 600 (text-red-600)</p>
          <p className="text-green-600">Green 600 (text-green-600)</p>
          <p className="text-yellow-500">Yellow 500 (text-yellow-500)</p>
          <p className="text-purple-600">Purple 600 (text-purple-600)</p>
          <p className="text-pink-600">Pink 600 (text-pink-600)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Alignment</h2>
        <div className="space-y-4">
          <p className="text-left bg-gray-100 p-2">Left aligned text (text-left)</p>
          <p className="text-center bg-gray-100 p-2">Center aligned text (text-center)</p>
          <p className="text-right bg-gray-100 p-2">Right aligned text (text-right)</p>
          <p className="text-justify bg-gray-100 p-2">
            Justified text (text-justify). This paragraph contains more text to demonstrate justification. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Vestibulum euismod, nisl eget consectetur sagittis, nisl nunc consectetur nisl, eget consectetur
            nisl nisl eget nisl.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Decoration</h2>
        <div className="space-y-4">
          <p className="underline">Underlined text (underline)</p>
          <p className="line-through">Strikethrough text (line-through)</p>
          <p className="no-underline">No underline (no-underline)</p>
          <p className="underline decoration-2 decoration-blue-500">Custom underline (decoration-2 decoration-blue-500)</p>
          <p className="underline decoration-wavy decoration-red-500">Wavy underline (decoration-wavy decoration-red-500)</p>
          <p className="underline decoration-dotted decoration-green-500">Dotted underline (decoration-dotted decoration-green-500)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Transform</h2>
        <div className="space-y-4">
          <p className="uppercase">Uppercase text (uppercase)</p>
          <p className="lowercase">Lowercase text (lowercase)</p>
          <p className="capitalize">capitalized text (capitalize)</p>
          <p className="normal-case">Normal case text (normal-case)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Letter Spacing</h2>
        <div className="space-y-4">
          <p className="tracking-tighter">Tighter letter spacing (tracking-tighter)</p>
          <p className="tracking-tight">Tight letter spacing (tracking-tight)</p>
          <p className="tracking-normal">Normal letter spacing (tracking-normal)</p>
          <p className="tracking-wide">Wide letter spacing (tracking-wide)</p>
          <p className="tracking-wider">Wider letter spacing (tracking-wider)</p>
          <p className="tracking-widest">Widest letter spacing (tracking-widest)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Line Height</h2>
        <div className="space-y-8">
          <div className="bg-gray-100 p-4">
            <p className="leading-none">
              Leading none (leading-none): This text has no line height, which means the lines are very close together. This can be useful
              for headings but is generally not recommended for paragraphs.
            </p>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="leading-tight">
              Leading tight (leading-tight): This text has a tight line height, which means the lines are closer together than normal. This
              can be useful for more compact text.
            </p>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="leading-normal">
              Leading normal (leading-normal): This text has a normal line height, which is the default for most text. This is generally the
              most readable option for paragraphs.
            </p>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="leading-relaxed">
              Leading relaxed (leading-relaxed): This text has a relaxed line height, which means the lines are further apart than normal.
              This can be useful for improving readability.
            </p>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="leading-loose">
              Leading loose (leading-loose): This text has a loose line height, which means the lines are very far apart. This can be useful
              for improving readability in certain contexts.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Text Overflow</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-1">Truncate (truncate):</p>
            <p className="truncate w-64 bg-gray-100 p-2">
              This is a very long text that will be truncated when it reaches the end of its container. You won't see this part of the text
              because it's truncated.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Overflow Ellipsis (overflow-ellipsis):</p>
            <p className="overflow-ellipsis overflow-hidden w-64 bg-gray-100 p-2">
              This is a very long text that will have an ellipsis when it reaches the end of its container. You won't see this part of the
              text because it's truncated.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Overflow Clip (overflow-clip):</p>
            <p className="overflow-clip overflow-hidden w-64 bg-gray-100 p-2">
              This is a very long text that will be clipped when it reaches the end of its container. You won't see this part of the text
              because it's clipped.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Prose Example</h2>
        <div className="prose max-w-none">
          <h3>Article Title</h3>
          <p>
            Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
            The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
          </p>
          <p>
            In modern times, typography has been defined as the art of mechanically producing letters, numbers, symbols, and shapes through
            the understanding of the basic elements, principles, and attributes of design.
          </p>
          <blockquote>"Typography is what language looks like." — Ellen Lupton</blockquote>
          <h4>Subsection</h4>
          <p>
            Good typography is measured by how well it reinforces the meaning of the text, not by some abstract scale of merit. Readability
            and legibility are paramount, and so is the situation for which a typeface is intended to be used.
          </p>
          <ul>
            <li>Serif typefaces have small decorative flourishes at the end of letter strokes</li>
            <li>Sans-serif typefaces do not have these flourishes</li>
            <li>Monospaced typefaces have letters that each occupy the same amount of horizontal space</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
