import { useSanityClient } from 'astro-sanity';
import { createImageBuilder } from 'astro-sanity';

export const imageBuilder = createImageBuilder(useSanityClient());

export function getImageUrl(source:object) {
  return imageBuilder.image(source);
}

export function getThumbnailUrl(source:object) {
  return getImageUrl(source).size(400,400).url();
}

export function getSmallUrl(source:object) {
  return getImageUrl(source).width(600).url();
}