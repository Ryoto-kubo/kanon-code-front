type ContactEvent = {
  eventAction: 'submit_form';
  eventCategory: 'contact';
  eventLabel: string;
  value?: any;
};

type ClickEvent = {
  eventAction: 'click';
  eventCategory: 'other';
  eventLabel: string;
  value?: any;
};

type PaymentEvent = {
  eventAction: 'payment';
  eventCategory: 'purchase';
  eventLabel: string;
  value?: any;
};

export type Event = ContactEvent | ClickEvent | PaymentEvent;
