# ITF React Datepicker

The datepicker developed for the ITF Website, check out the [DEMO](https://iancottam91.github.io/itf-react-datepicker)

## Props

Yo, this datepicker needs a wrapper that holds the state of the start and end dates. This gives you the flexibility to change the selected dates from your own code e.g. in a reset dates button. 

Here are the props:

| prop | type  | description  |
|---|---|---|
| startDate | `Date`  | The start date |
| endDate | `Date`  | The end date |
| onDateChange | `(startDate: Date | null, endDate: Date | null) => void`  | The callback when a date is selected in the datepicker |
| disabled? | `boolean`  | is it disabled on not, duh |
| bemModifier? | `string`  | a class for the datepicker, if you want it |
| elementId? | `string`  | an id for the datepicker, if you want it |

You should hold the state for startDate and endDate in your wrapper component and update it with onDateChange. See [DatePickerExample](src/DatePickerITF/DatePickerExample.tsx) for an ... example.

## Let me know what you think in the issues!