# JSON Manager stories (prompt input)

Paste **one** story into the generic prompt. Do not edit `generic-prompt.md`.

These AC are taken from the current UI, not a PO spec.
Button, toast, and heading copy matches the UI — do not rewrite it.
If behaviour is unclear, leave it in Gaps; do not assert it.

## Product context (paste into CONTEXT every time)

```text
Product: JSON Manager — a web app for preparing employee and payroll
JSON (test data for QA).
Auth: none. Pages are public.
Check type: functional manual UI cases.
Out of scope: performance, security pentest, visual layout.
```

Then append that story’s `Screens` and `Visible elements`.

---

## 1. Import JSON

```text
Screens in this story:
- Home (/home)
- tabs: Employees, Benefits, Employee templates

Visible elements (only these; do not add any):
- "Import JSON Data" button
- "Export" button (not always visible)
- dialog titled "Import Data"
- field with placeholder "Paste your JSON data here"
- template employee select, empty value:
  "No Template Employee Selected"
- the select list includes the base employee "John"
- dialog buttons: "Import", "Close"
- Employees tab grid columns: First name, Last name, eId
- toasts:
  - "Invalid data format. Please correct and try again."
  - "Invalid JSON data. Please correct and try again."
  - "Select the name of the base employee!"

USER STORY
As a QA I want to import JSON or pick a base employee
so that the grid is filled with test data.

ACCEPTANCE CRITERIA
AC-1. Valid JSON (object with employees and/or benefits) in the input
      field + click "Import" → the dialog closes, and the data appears
      in the matching grid (Employees and/or Benefits).
AC-2. Text that cannot be parsed as JSON → toast
      "Invalid data format. Please correct and try again.",
      the dialog stays open, the grid does not change.
AC-3. While the input field has text, the template employee select
      is disabled. While an employee is selected (not the empty value),
      the input field is disabled.
AC-4. Selecting an employee from the select (not
      "No Template Employee Selected") + click "Import" → the dialog
      closes, and the Employees tab shows that one selected employee.
AC-5. If the input field is empty and the select is
      "No Template Employee Selected", the "Import" button is disabled.
AC-6. "Close" closes the dialog. The grid does not change.
```

## 2. Export JSON

```text
Screens in this story:
- Home (/home)
- tabs: Employees, Benefits, Employee templates

Visible elements (only these; do not add any):
- "Import JSON Data" button
- "Export" button
- dialog titled "Export Data"
- field with placeholder "Enter file name"
- read-only JSON preview field
- copy-to-clipboard icon
- dialog buttons: "Download", "Close"
- toasts:
  - "Please enter a valid file name."
  - "Text successfully copied to clipboard!"
- Comment column on the Employee templates tab
  (placeholder "Type your comment...")

USER STORY
As a QA I want to export the current data to a file and/or copy the JSON
so that I can pass the dataset into automated tests.

ACCEPTANCE CRITERIA
AC-1. If the app has at least one employee or benefit,
      the "Export" button is visible on Employees and Employee templates.
AC-2. If employees and benefits are empty, there is no "Export" button.
AC-3. On the Benefits tab there are no "Import JSON Data" or "Export"
      buttons.
AC-4. "Export" opens the "Export Data" dialog with a JSON preview of
      the current data. The preview field cannot be edited.
AC-5. Empty file name + "Download" → toast
      "Please enter a valid file name.", the dialog stays open,
      no file is downloaded.
AC-6. Non-empty file name + "Download" → a `{name}.txt` file is
      downloaded, the dialog closes.
AC-7. Clicking the copy icon → toast
      "Text successfully copied to clipboard!".
AC-8. If an employee had a comment in the grid, the exported JSON
      has no comment field on employees.
AC-9. "Close" closes the dialog without downloading a file.
```

## 3. Duplicate employee

```text
Screens in this story:
- Home (/home)
- Employees tab

Visible elements (only these; do not add any):
- Employees grid: First name, Last name, eId
- row menu: Details, Save employee template, Duplicate, Delete
- Duplicate dialog
- text "Enter the number of duplicates:"
- "Number of duplicates" field, placeholder "Enter count"
- default field value: 1
- buttons: "Duplicate", "Cancel"

USER STORY
As a QA I want to duplicate an employee N times
so that I can quickly get a batch of similar test records.

ACCEPTANCE CRITERIA
AC-1. "Duplicate" in the row menu opens the Duplicate dialog.
      The "Number of duplicates" field already contains 1.
AC-2. "Duplicate" with number N (integer > 0) closes the dialog and
      adds exactly N new rows to the Employees grid.
AC-3. Each new row has its own First name, Last name, and eId
      (they do not match the source row; eId values are unique in the grid).
AC-4. The source row stays in the grid with First name / Last name / eId
      unchanged.
AC-5. "Cancel" closes the dialog; the number of grid rows does not change.
```

## 4. Home tabs

```text
Screens in this story:
- Home (/home)

Visible elements (only these; do not add any):
- tabs: Employees, Benefits, Employee templates
- "Import JSON Data" button
- "Export" button
- Employees grid: First name, Last name, eId
- Benefits grid
- Employee templates grid: First name, Last name, Comment
- Employee templates grid includes the base employee John Monthly (eId 1)

USER STORY
As a user I want to switch between Employees / Benefits /
Employee templates so that I can see the dataset I need.

ACCEPTANCE CRITERIA
AC-1. The Employees tab shows a grid with columns
      First name, Last name, eId and the "Import JSON Data" button.
AC-2. The Benefits tab shows the benefits grid.
      There are no "Import JSON Data" or "Export" buttons.
AC-3. The Employee templates tab shows a grid with columns
      First name, Last name, Comment.
      The grid includes employee John Monthly.
      The "Import JSON Data" button is visible.
AC-4. Data imported on Employees is still there after leaving for
      Benefits and returning to Employees.
```

## 5. Employee templates (save / remove)

```text
Screens in this story:
- Home (/home)
- tabs: Employees, Employee templates
- Import Data dialog (template employee select)

Visible elements (only these; do not add any):
- row menu on Employees:
  Details, Save employee template, Duplicate, Delete
- row menu on Employee templates:
  Details, Save employee template, Duplicate, Remove employee template
- toasts:
  - "This name is not allowed. Please choose a different one."
  - "Employee saved successfully."
  - "Employee {firstName} updated successfully."
  - "Employee removed successfully."
  - "Employee with eId {eId} was not found in localStorage."
- the base template John Monthly cannot be saved as a template

USER STORY
As a QA I want to save an employee as a template and remove a template
so that I can reuse the set in later sessions and in Import.

ACCEPTANCE CRITERIA
AC-1. "Save employee template" for an employee whose First name is not John
      → toast "Employee saved successfully."
      The employee appears on the Employee templates tab
      and in the Import Data dialog select.
AC-2. Saving the template again for the same First name
      → toast "Employee {firstName} updated successfully."
AC-3. "Save employee template" for John
      → toast "This name is not allowed. Please choose a different one."
      No new template is created.
AC-4. "Remove employee template" for a user-saved template
      → toast "Employee removed successfully."
      The employee disappears from Employee templates and from the
      Import Data select.
```

## 6. Employee details

```text
Screens in this story:
- Home (/home), Employees tab
- employee details dialog

Visible elements (only these; do not add any):
- row menu: Details
- double-click on a grid row
- dialog title: "Details of Employee: {firstName} {lastName}"
- details tabs: Personal, Job, Deposit accounts,
  Custom incomes, Custom deductions, Benefits, Bonus
- edit button on the Personal tab
- Edit form: Cancel, Save
- email field; validation error: "Invalid email"
- Base currency code field; error:
  "Currency code must be at most 3 characters"

USER STORY
As a user I want to open employee details and edit Personal
so that I can fix email and currency in the test data.

ACCEPTANCE CRITERIA
AC-1. "Details" in the row menu or a double-click on a row opens the dialog
      "Details of Employee: {firstName} {lastName}".
AC-2. The dialog has tabs Personal, Job, Deposit accounts,
      Custom incomes, Custom deductions, Benefits, Bonus.
AC-3. Save with an invalid email → "Invalid email" under the field;
      the edit dialog does not close as a successful save.
AC-4. Save with a Base currency code longer than 3 characters →
      "Currency code must be at most 3 characters".
AC-5. Save with a valid email and a currency code of 1–3 characters
      closes the edit form; Personal shows the new values.
AC-6. Cancel closes the edit form without saving changes.
```

## 7. Navigation

```text
Screens in this story:
- Home (/home)
- Charts (/charts)

Visible elements (only these; do not add any):
- header text "CayPay"
- menu item "JSON Manager"
- menu item "Charts"
- default card title on /charts: "Common Test Metrics"
- "Tests" and "Envs" selects
- "Loading" text while the chart loads

USER STORY
As a user I want to switch between JSON Manager and Charts
via the menu so that I can open the section I need.

ACCEPTANCE CRITERIA
AC-1. "JSON Manager" opens /home
      (Employees / Benefits / Employee templates tabs).
AC-2. "Charts" opens /charts.
      "Common Test Metrics" and the Tests and Envs selects are visible.
AC-3. Opening the site root / redirects to /home.
AC-4. An unknown path redirects to /home.
AC-5. The menu item for the current section is not available to click again.
```

---

## Known gaps (not AC)

Park these in **Gaps / questions for PO** unless a PO confirms them:

- what counts as “valid JSON” beyond parse (are `employees` / `benefits` required, partial object, array instead of object);
- the second import message `"Invalid JSON data. Please correct and try again."` — when it appears vs `"Invalid data format..."`;
- Duplicate: `0`, negative, empty, fractional, very large N; non-numeric input;
- deleting an employee (`Delete`) and adding a benefit;
- Charts: specific test/env names, comments on chart points, API errors;
- templates surviving a page reload (persist is not stated in the UI toasts).
