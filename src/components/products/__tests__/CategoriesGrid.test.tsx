import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoriesGrid } from '../CategoriesGrid';
import { ProductCategory } from '@/types/product';

// Mock the OptimizedImage component
jest.mock('@/components/ui/OptimizedImage', () => ({
  OptimizedImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="optimized-image" />
  ),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
});

describe('CategoriesGrid', () => {
  const mockCategories: ProductCategory[] = [
    {
      id: 'category1',
      name: 'Category 1',
      description: 'Description 1',
      featuredImage: '/images/categories/category1.jpg',
      slug: 'category-1',
      featured: true,
    },
    {
      id: 'category2',
      name: 'Category 2',
      description: 'Description 2',
      featuredImage: '/images/categories/category2.jpg',
      slug: 'category-2',
      featured: false,
    },
  ];

  it('renders the correct number of categories', () => {
    render(<CategoriesGrid categories={mockCategories} />);
    
    const categoryLinks = screen.getAllByTestId('next-link');
    expect(categoryLinks).toHaveLength(2);
  });

  it('renders category names and descriptions', () => {
    render(<CategoriesGrid categories={mockCategories} />);
    
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders OptimizedImage with correct props', () => {
    render(<CategoriesGrid categories={mockCategories} />);
    
    const images = screen.getAllByTestId('optimized-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/images/categories/category1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Category 1');
  });

  it('renders links with correct hrefs', () => {
    render(<CategoriesGrid categories={mockCategories} />);
    
    const links = screen.getAllByTestId('next-link');
    expect(links[0]).toHaveAttribute('href', '/productos/category-1');
    expect(links[1]).toHaveAttribute('href', '/productos/category-2');
  });

  it('renders a message when no categories are provided', () => {
    render(<CategoriesGrid categories={[]} />);
    
    expect(screen.getByText('No hay categorías disponibles')).toBeInTheDocument();
  });

  it('applies the correct grid columns based on the columns prop', () => {
    const { container, rerender } = render(<CategoriesGrid categories={mockCategories} columns={2} />);
    
    expect(container.firstChild).toHaveClass('grid-cols-1 md:grid-cols-2');
    
    rerender(<CategoriesGrid categories={mockCategories} columns={3} />);
    expect(container.firstChild).toHaveClass('grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
    
    rerender(<CategoriesGrid categories={mockCategories} columns={4} />);
    expect(container.firstChild).toHaveClass('grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4');
  });
});
