declare global {
  namespace JSX {
    interface IntrinsicElements {
      "add-to-cal-button": {
        title?: string;
        description?: string;
        options?: string[];
        address?: string;
        startdate?: string;
        enddate?: string;
        starttime?: string;
        endtime?: string;
        timeZone?: string;
        language?: string;
      };
    }
  }
}

export interface AddToCalButtonAttributes
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  options?: string[];
  address?: string;
  startdate?: string;
  enddate?: string;
  starttime?: string;
  endtime?: string;
  timeZone?: string;
  language?: string;
}
