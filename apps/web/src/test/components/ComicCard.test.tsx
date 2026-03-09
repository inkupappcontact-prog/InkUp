import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ComicCard from '@/components/ComicCard';

describe('ComicCard - Component Tests', () => {
  const defaultProps = {
    title: 'Test Comic',
    author: 'Test Author',
    cover: 'https://example.com/cover.jpg',
    price: 25,
    category: 'Sci-Fi',
    hasPhysical: true,
    stock: 5,
  };

  describe('Rendering', () => {
    it('should render comic title and author', () => {
      render(<ComicCard {...defaultProps} />);
      
      expect(screen.getByText('Test Comic')).toBeInTheDocument();
      expect(screen.getByText(/test author/i)).toBeInTheDocument();
    });

    it('should display correct price', () => {
      render(<ComicCard {...defaultProps} />);
      
      expect(screen.getByText('25 €')).toBeInTheDocument();
    });

    it('should show category badge', () => {
      render(<ComicCard {...defaultProps} />);
      
      expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    });

    it('should render image with alt text', () => {
      render(<ComicCard {...defaultProps} />);
      
      const image = screen.getByAltText('Test Comic');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/cover.jpg');
    });
  });

  describe('Stock Status', () => {
    it('should show "In stock" when stock > 5', () => {
      render(<ComicCard {...defaultProps} stock={10} />);
      
      expect(screen.getByText(/en stock/i)).toBeInTheDocument();
    });

    it('should show warning when stock < 5', () => {
      render(<ComicCard {...defaultProps} stock={3} />);
      
      expect(screen.getByText(/plus que 3/i)).toBeInTheDocument();
    });

    it('should show "Out of stock" when stock is 0', () => {
      render(<ComicCard {...defaultProps} stock={0} />);
      
      expect(screen.getByText(/épuisé/i)).toBeInTheDocument();
    });

    it('should not show stock info when hasPhysical is false', () => {
      render(<ComicCard {...defaultProps} hasPhysical={false} />);
      
      expect(screen.queryByText(/stock/i)).not.toBeInTheDocument();
    });
  });

  describe('Mature Content', () => {
    it('should show mature badge when isMature is true', () => {
      render(<ComicCard {...defaultProps} isMature={true} />);
      
      expect(screen.getByText(/18\+/i)).toBeInTheDocument();
    });

    it('should not show mature badge by default', () => {
      render(<ComicCard {...defaultProps} />);
      
      expect(screen.queryByText(/18\+/i)).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onRead when read button is clicked', () => {
      const mockOnRead = vi.fn();
      render(<ComicCard {...defaultProps} onRead={mockOnRead} />);
      
      const readButton = screen.getByRole('button', { name: /lire/i });
      fireEvent.click(readButton);
      
      expect(mockOnRead).toHaveBeenCalledWith('Test Comic');
    });

    it('should handle like toggle', () => {
      render(<ComicCard {...defaultProps} />);
      
      const likeButton = screen.getByRole('button', { name: /like/i });
      fireEvent.click(likeButton);
      
      // Button should show liked state
      expect(likeButton).toHaveClass('bg-red-500');
    });
  });

  describe('Edge Cases', () => {
    it('should handle free comics (price = 0)', () => {
      render(<ComicCard {...defaultProps} price={0} />);
      
      expect(screen.getByText(/gratuit/i)).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      render(
        <ComicCard 
          title="Minimal" 
          author="Author" 
          cover="cover.jpg" 
          price={10}
          category="Test"
        />
      );
      
      expect(screen.getByText('Minimal')).toBeInTheDocument();
    });
  });
});
