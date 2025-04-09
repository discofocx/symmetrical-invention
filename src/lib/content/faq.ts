// src/lib/content/faq.ts
import fs from 'fs';
import path from 'path';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  title: string;
  description: string;
  items: FAQItem[];
}

const faqDirectory = path.join(process.cwd(), 'src/content/faq');

export function getFAQCategories(): FAQCategory[] {
  try {
    const filePath = path.join(faqDirectory, 'faq-items.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return data as FAQCategory[];
  } catch (error) {
    console.error('Error loading FAQ categories:', error);
    return [];
  }
}

export function getFAQCategoryBySlug(slug: string): FAQCategory | null {
  try {
    const categories = getFAQCategories();
    const category = categories.find(cat => cat.category === slug);
    
    return category || null;
  } catch (error) {
    console.error(`Error finding FAQ category by slug: ${slug}`, error);
    return null;
  }
}

export function getAllFAQItems(): FAQItem[] {
  try {
    const categories = getFAQCategories();
    let allItems: FAQItem[] = [];
    
    categories.forEach(category => {
      allItems = [...allItems, ...category.items];
    });
    
    return allItems;
  } catch (error) {
    console.error('Error loading all FAQ items:', error);
    return [];
  }
}

export function searchFAQs(query: string): FAQItem[] {
  if (!query || query.trim() === '') {
    return [];
  }
  
  try {
    const normalizedQuery = query.toLowerCase().trim();
    const allItems = getAllFAQItems();
    
    return allItems.filter(item => 
      item.question.toLowerCase().includes(normalizedQuery) || 
      item.answer.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error(`Error searching FAQs for: ${query}`, error);
    return [];
  }
}