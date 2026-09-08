# Resume downloads

`src/content/resume.json` supplies the `/resume` page and both downloads. Edit that
file, then regenerate the documents together so the public files match the page.

With Python and `python-docx` available:

```sh
python3 scripts/build-resume.py
```

This writes `public/Michael_Grier_Resume.docx`. From the repository root, export
it as a tagged PDF with LibreOffice:

```sh
soffice --headless --convert-to 'pdf:writer_pdf_Export:{"UseTaggedPDF":{"type":"boolean","value":"true"}}' --outdir public public/Michael_Grier_Resume.docx
```

Close other LibreOffice windows before running the command so it starts a
headless process. Check both pages for clipping, page breaks, working links, and
readable text after exporting. The site build does not regenerate these files.

The document embeds regular and bold instances of Familjen Grotesk, matching the
portfolio font. The files in `resume-assets/` were instantiated at weights 400 and
700 from the [Google Fonts variable font](https://github.com/google/fonts/tree/main/ofl/familjengrotesk).
Its SIL Open Font License is included in `resume-assets/OFL.txt`.
The static font files have distinct unique identifiers and matching regular/bold
style flags so document readers can distinguish the two embedded weights.

The decorative `lightburst.png` uses the portfolio's blue and pink ray pattern,
fading into white in the upper-right corner. It is anchored behind the text and
repeated at a smaller size on page two. All resume text remains native document
text. To revise the artwork, run `python3 scripts/build-resume-lightburst.py`
with NumPy and Pillow installed, then regenerate both documents.
