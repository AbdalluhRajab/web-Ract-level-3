# Fixes Applied Before Demo

## Customer logout
- Added a visible Logout action to the public header for signed-in users.
- Added a logout action to the Customer page.
- Logout clears the persisted local session and returns to the home page.
- Added confirmation using the reusable Modal.

## Product search
- Added a public product search field.
- Search matches product name, SKU and category.
- Search requests are cancellable so older requests cannot overwrite newer results.
- Added a clear-search action and a no-results state.
- Existing infinite-scroll browsing remains available when the search field is empty.

## Validation note
A full `npm run check` could not be completed in this environment because the archived `node_modules` is incomplete (`@rollup/pluginutils` / `@babel/types` missing) and the bundled Node test command uses an unsupported `--test-isolation=none` option. Run `npm install` in the extracted project on your machine before the final demo.
