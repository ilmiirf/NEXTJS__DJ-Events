export type Event = {
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: Date;
  time: string;
  description: string;
  image?: string;
  img: string;
};

export interface EventData {
  id: number;
  attributes: Event;
}
