# Add to Cal Button

A Web Component that provides buttons to add an event to a calendar.

## Attributes:

- title: The title of the event. (optional)
- start-date: The start date of the event.
- start-time: The start time of the event. (optional, default to whole day event)
- end-date: The end date of the event. (optional, defaults to start date)
- end-time: The end time of the event. (optional, defaults to whole day event)
- description: The description of the event. (optional)
- address: The address of the event. (optional)

## Usage

```html
<add-to-cal-button
  title="Meeting with Bob"
  start-date="2023-10-01"
  start-time="10:00"
  end-date="2023-10-01"
  end-time="11:00"
  description="Discuss project updates"
  address="123 Main St, Anytown, USA"
>
</add-to-cal-button>
```
