import { useSanityClient, groq } from 'astro-sanity';
import { Octokit } from 'octokit';
import { formatLanguageData } from '../utils/utils';

// Octokit
const octokit = new Octokit({});

export async function fetchRepository(username: string, slug: string) {
  try {
    const repository = await octokit.request(
      `GET /repos/${username}/${slug}`,
      {
        owner:username,
        repo: slug,
        auth: import.meta.env.VITE_GITHUB_API_KEY,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    return repository.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

export async function fetchLanguages(username: string, slug: string) {
  try {
    const languages = await octokit.request(
      `GET /repos/${username}/${slug}/languages`,
      {
        owner:username,
        repo: slug,
        auth: import.meta.env.VITE_GITHUB_API_KEY,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    return formatLanguageData(languages.data);
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

export async function fetchCommits(username: string, slug: string) {
  try {
    const commits = await octokit.request(
      `GET /repos/${username}/${slug}/commits`,
      {
        owner:username,
        repo: slug,
        auth: import.meta.env.VITE_GITHUB_API_KEY,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    return commits.data;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
}

// Sanity
export async function fetchGlobal() {
  const query = `*[_type == "globalSettings"][0]`;
  const global = await useSanityClient().fetch(query);

  return global;
}

export async function fetchProfile() {
  const query = groq`*[_type == "profileDetails"][0]`;
  const profile = await useSanityClient().fetch(query);

  return profile;
}

export async function fetchHobbies() {
  const query = groq`*[_type == "profileDetails"][0] {hobbies[]->}`;
  const hobbies = await useSanityClient().fetch(query);

  return hobbies;
}

export async function fetchProjects() {
  const query = groq`*[_type == "project"] | order(title asc) {
      _id,
      intro,
      mainImage,
      slug,
      status,
      title,
    }`;
  const projects = await useSanityClient().fetch(query);

  return projects;
}

export async function fetchFeaturedProjects() {
  const query = groq`*[_type == "project" && featured] | order(_updatedAt desc) {
      _id,
      intro,
      description,
      mainImage,
      slug,
      status,
      title,
    }`;
  const projects = await useSanityClient().fetch(query);

  return projects;
}

export async function fetchProject(slug: string) {
  const query = groq`*[_type == "project" && slug.current == '${slug}'] {
    _id,
    customUrl,
    description,
    featured,
    intro,
    mainImage,
    galleryImages,
    relatedProjects[]->{_id, slug, title, mainImage, intro},
    repository,
    repositoryUsername,
    repositorySlug,
    slug,
    status,
    technologies[]->{_id, title, slug, description, website, tags[]->{title, slug}},
    tags[]->{title, slug},
    title,
    url,
  }`;

  const project = await useSanityClient().fetch(query);
  return project[0];
}

export async function fetchSkills() {
  const query = groq`*[_type == "skillsList"] | order(title) {title, "skills" : skills[] -> {title, website}}`;
  const skills = await useSanityClient().fetch(query);

  return skills;
}
