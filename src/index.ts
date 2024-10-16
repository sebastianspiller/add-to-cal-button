/**
 * A Web Component that provides buttons to add an event to a calendar.
 *
 * Attributes:
 *  - title: The title of the event. (optional)
 *  - startDate: The start date of the event.
 *  - startTime: The start time of the event. (optional, default to whole day event)
 *  - endDate: The end date of the event. (optional, defaults to start date)
 *  - endTime: The end time of the event. (optional, defaults to whole day event)
 *  - description: The description of the event. (optional)
 *  - address: The address of the event. (optional)
 *
 * Usage:
 *      <add-to-cal-button
 *          title="My Event"
 *          startDate="2021-12-31"
 *          startTime="12:00:00"
 *          endDate="2022-01-01"
 *          endTime="12:00:00"
 *          description="This is a test event"
 *          address="123 Main St, Springfield, IL"
 *      ></add-to-cal-button>
 */
class AddToCalButton extends HTMLElement {
  isOpen: boolean;
  startDate: any;
  startTime: any;
  endDate: any;
  endTime: any;
  description: any;
  address: any;
  timezone: any;
  language: any;
  options: any;
  googleLink: any;
  appleLink: any;
  yahooLink: any;
  outlookLink: any;
  office365Link: any;
  otherCalendarLink: any;
  static get observedAttributes() {
    return [
      "title",
      "startdate",
      "starttime",
      "enddate",
      "endtime",
      "description",
      "address",
      "timezone",
      "language",
      "options",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default value of Button Menu (closed).
    this.isOpen = false;

    if (!this.shadowRoot) {
      throw new Error("add-to-cal-button: Shadow DOM creation failed.");
    }

    this.addEventListener("mouseover", this.openMenu.bind(this));
    this.addEventListener("mouseout", this.closeMenu.bind(this));
    this.addEventListener("click", this.toggleMenu.bind(this));
    this.addEventListener("blur", this.closeMenu.bind(this));

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  openMenu() {
    this.isOpen = true;
    this.updateMenu();
  }

  closeMenu() {
    this.isOpen = false;
    this.updateMenu();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.updateMenu();
  }

  updateMenu() {
    const menu: HTMLElement | null | undefined =
      this.shadowRoot?.querySelector(".dropdown-content");

    if (!menu) {
      throw new Error("add-to-cal-button: Menu not found in the shadow DOM.");
    }

    if (this.isOpen) {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    switch (name) {
      case "title":
        this.title = newValue;
        break;
      case "startdate":
        this.startDate = newValue;
        break;
      case "starttime":
        this.startTime = newValue;
        break;
      case "enddate":
        this.endDate = newValue;
        break;
      case "endtime":
        this.endTime = newValue;
        break;
      case "description":
        this.description = newValue;
        break;
      case "address":
        this.address = newValue;
        break;
      case "timezone":
        this.timezone = newValue;
        break;
      case "language":
        this.language = newValue;
        break;
      case "options":
        this.options = newValue;
        break;
    }
  }

  connectedCallback() {
    this.render();

    if (!this.shadowRoot) {
      throw new Error("add-to-cal-button: Shadow DOM creation failed.");
    }

    // Füge Event-Listener hinzu, wenn das Element dem DOM hinzugefügt wird
    this.googleLink = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-google",
    );
    this.appleLink = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-apple",
    );
    this.yahooLink = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-yahoo",
    );
    this.outlookLink = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-outlook",
    );
    this.office365Link = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-office365",
    );
    this.otherCalendarLink = this.shadowRoot.querySelector(
      "#add-to-cal-button-link-other",
    );

    if (
      !this.googleLink ||
      !this.appleLink ||
      !this.yahooLink ||
      !this.outlookLink ||
      !this.office365Link ||
      !this.otherCalendarLink
    ) {
      throw new Error(
        "add-to-cal-button: Buttons not found in the shadow DOM.",
      );
    }

    this.googleLink.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "google"),
    );
    this.appleLink.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "apple"),
    );
    this.yahooLink.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "yahoo"),
    );
    this.outlookLink.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "outlook"),
    );
    this.office365Link.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "office365"),
    );
    this.otherCalendarLink.addEventListener(
      "click",
      this.handleLinkClick.bind(this, "other"),
    );
  }

  disconnectedCallback() {
    // Entferne Event-Listener, wenn das Element aus dem DOM entfernt wird
    if (this.googleLink) {
      this.googleLink.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "google"),
      );
    }
    if (this.appleLink) {
      this.appleLink.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "apple"),
      );
    }
    if (this.yahooLink) {
      this.yahooLink.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "yahoo"),
      );
    }
    if (this.outlookLink) {
      this.outlookLink.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "outlook"),
      );
    }
    if (this.office365Link) {
      this.office365Link.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "office365"),
      );
    }
    if (this.otherCalendarLink) {
      this.otherCalendarLink.removeEventListener(
        "click",
        this.handleLinkClick.bind(this, "other"),
      );
    }
  }

  handleLinkClick(type: string, event: Event) {
    event.preventDefault();
    let url = "";

    switch (type) {
      case "google":
        url = this.getGoogleCalendarUrl();
        break;
      case "apple":
        url = this.getAppleCalendarUrl();
        break;
      case "yahoo":
        url = this.getYahooCalendarUrl();
        break;
      case "outlook":
        url = this.getOutlookCalendarUrl();
        break;
      case "office365":
        url = this.getOffice365CalendarUrl();
        break;
      default:
        url = this.getAnotherCalendarUrl();
    }

    if (url) {
      window.open(url, "_blank");
    }
  }

  getGoogleCalendarUrl() {
    return encodeURI(
      [
        "https://www.google.com/calendar/render",
        "?action=TEMPLATE",
        "&text=" + (this.title || ""),
        "&dates=" + (formatTime(this.startDate, this.startTime) || ""),
        "/" + (calculateEndDate(this) || ""),
        "&details=" + (this.description || ""),
        "&location=" + (this.address || ""),
        "&sprop=&sprop=name:",
      ].join(""),
    );
  }

  getOutlookCalendarUrl() {
    return encodeURI(
      [
        "https://outlook.live.com/owa/",
        "?path=/calendar/action/compose",
        "&rru=addevent",
        "&subject=" + (this.title || ""),
        "&startdt=" + (formatTime(this.startDate, this.startTime) || ""),
        "&enddt=" + (calculateEndDate(this) || ""),
        "&body=" + (this.description || ""),
        "&location=" + (this.address || ""),
      ].join(""),
    );
  }

  getAppleCalendarUrl() {
    return encodeURI(
      [
        "data:text/calendar;charset=utf8",
        [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          "SUMMARY:" + (this.title || ""),
          "DTSTART:" + (formatTime(this.startDate, this.startTime) || ""),
          "DTEND:" + (calculateEndDate(this) || ""),
          "DESCRIPTION:" + (this.description || ""),
          "LOCATION:" + (this.address || ""),
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n"),
      ].join(","),
    );
  }

  getYahooCalendarUrl() {
    return encodeURI(
      [
        "https://calendar.yahoo.com/?v=60&view=d&type=20",
        "&title=" + (this.title || ""),
        "&st=" + (formatTime(this.startDate, this.startTime) || ""),
        "&et=" + (calculateEndDate(this) || ""),
        "&desc=" + (this.description || ""),
        "&in_loc=" + (this.address || ""),
      ].join(""),
    );
  }

  getOffice365CalendarUrl() {
    return encodeURI(
      [
        "https://outlook.office.com/owa/",
        "?path=/calendar/action/compose",
        "&rru=addevent",
        "&subject=" + (this.title || ""),
        "&startdt=" + (formatTime(this.startDate, this.startTime) || ""),
        "&enddt=" + (calculateEndDate(this) || ""),
        "&body=" + (this.description || ""),
        "&location=" + (this.address || ""),
      ].join(""),
    );
  }

  getAnotherCalendarUrl() {
    return encodeURI(
      [
        "data:text/calendar;charset=utf8",
        [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          "SUMMARY:" + (this.title || ""),
          "DTSTART:" + (formatTime(this.startDate, this.startTime) || ""),
          "DTEND:" + (calculateEndDate(this) || ""),
          "DESCRIPTION:" + (this.description || ""),
          "LOCATION:" + (this.address || ""),
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n"),
      ].join(","),
    );
  }

  render() {
    if (!this.shadowRoot) {
      throw new Error("add-to-cal-button: Shadow DOM creation failed.");
    }

    this.shadowRoot.innerHTML = `
      <style>
        .dropdown {
          position: relative;
          display: inline-block;
        }
  
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
  
        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }
  
        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }
  
        .dropdown:hover .dropdown-content {
          display: block;
        }
  
        .dropdown:hover .dropbtn {
          background-color: #3e8e41;
        }
  
        .dropbtn {
          background-color: #007bff;
          color: white;
          padding: 16px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      </style>
      <div class="dropdown">
        <button class="dropbtn">Add to Calendar</button>
        <div class="dropdown-content">
          <a id="add-to-cal-button-link-google" href="#" target="_blank">Add to Google Calendar</a>
          <a id="add-to-cal-button-link-apple" href="#" target="_blank">Add to Apple Calendar</a>
          <a id="add-to-cal-button-link-yahoo" href="#" target="_blank">Add to Yahoo Calendar</a>
          <a id="add-to-cal-button-link-outlook" href="#" target="_blank">Add to Outlook Calendar</a>
          <a id="add-to-cal-button-link-office365" href="#" target="_blank">Add to Office 365 Calendar</a>
          <a id="add-to-cal-button-link-other" href="#" target="_blank">Add to Other Calendar</a>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("add-to-cal-button")) {
  customElements.define("add-to-cal-button", AddToCalButton);
}

// --- helper functions
function formatTime(date: string, time: string | null) {
  date = date.replace(/-/g, "");
  time = time ? time.replace(/:/g, "") : "";
  return time ? `${date}T${time}` : date;
}

function calculateEndDate(that: AddToCalButton) {
  return that.endDate
    ? formatTime(that.endDate, that.endTime)
    : formatTime(that.startDate, that.startTime);
}
