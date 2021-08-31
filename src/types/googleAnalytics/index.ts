type ContactEvent = {
  eventAction: 'submit_form';
  eventCategory: 'contact';
  eventLabel: string;
  value: any;
};

type ClickEvent = {
  eventAction: 'click';
  eventCategory: 'other' | 'purchase';
  eventLabel: string;
  value: any;
};

export type Event = ContactEvent | ClickEvent;
