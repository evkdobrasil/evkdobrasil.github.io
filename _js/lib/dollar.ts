export const $ = (query: string, context = document) =>
  (query
    ? Array.from(context.querySelectorAll(query))
    : [document]) as unknown as HTMLElement[];

$.first = (query: string, context = document) =>
  (query ? context.querySelector(query) : context) as unknown as HTMLElement;
