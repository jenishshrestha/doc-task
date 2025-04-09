# ⚒️ Provided Tasks

## Right Sidebar

- ✅ Implement a right sidebar that lists all fields extracted from the document, using data from section.json.
- ✅ Each field should display its title and value.
- ✅ There is a badge on the left based on the field title's initial letters with a random background.
- ✅ Checkbox is mandatory feature to select the fields for the confirm action
- ✅ The more menu icon will have a remove option where the field can be removed (
no api calls required just to manage at the store/state level)
- ✅ The section.json is a dynamic list so when a new field is added to the list the
component should be created in such a way that it can render it dynamically.

## Document Previewer

- ✅ Create an image/document previewer to display field highlights.
- ✅ Ensure the image fits the screen on initial page load.
- ✅ Implement zoom in/out options with internal scroll (fit, 75%, 100%) from a
dropdown field above the document viewer.

## Field Highlighting

- ✅ On checkbox selection or hovering over a section field, highlight specific areas in
the document with random or a single color.
- ✅ When the cursor is positioned near the areas in the document where fields are
present, both the field in the document and the field in the sidebar should be
highlighted for better interaction.

## Review Actions

- ✅ The bottom of the review section has confirm and select all buttons.
- ✅ No API calls are required here. The focus is solely on changing the UI state alone.
- ✅ Add a 'Select All' button for users to select all fields in one click.
- ✅ Enable the confirm button at the bottom of the sidebar when more than one
field is selected.
- ✅ Upon clicking confirm, display a confirmation popup. Eg.(Are you sure you want to confirm the selected fields?)
- ✅ On confirmation, show an approved modal with a relevant message. Eg.(Fields confirmed and processed successfully!)
- ✅ On cancel, just close the modal.

## Non Functional Requirements (Nice to have but not a mandatory)

- ✅ Optionally include a toggle at the header for dark and light modes (to assess theme.
experience).
- ❌ Implement keyboard shortcuts for navigating through each field within the sidebar.
- ✅ Using codebase with typescript support is appreciable.
- ✅ Run Google Lighthouse locally or with a deployed version and attach a screenshot of the
insights in the Readme.
