// types
import { Metadata } from "../types";

// parser
import matter from "gray-matter";

export function extractMetadata(src: string): Metadata | null {
  try {
    const result = matter(src);
    return result.data as Metadata;
  } catch (error) {
    console.error("Failed to extract metadata", error);
    return null;
  }
}