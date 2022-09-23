# Custom 'print-links' JavaScript action

Prints all existing links in provided file.

## Generating dist

Install @vercel/ncc:
```
npm i -g @vercel/ncc
```
Before committing regenerate the ./dist/index.js file:
```
cd .github/actions/print-links
ncc build index.js
```
