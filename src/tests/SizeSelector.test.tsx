import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SizeSelector } from '../components/SizeSelector';
import React from 'react';

// Simple wrapper since acceptable
const renderComponent = (ui: React.ReactElement) => render(ui);

describe('SizeSelector', () => {
    const options = [
        { id: '1', label: 'Small', sizeLabel: 'Petite' },
        { id: '2', label: 'Large', sizeLabel: 'Grande' }
    ];

    it('renders all options', () => {
        renderComponent(<SizeSelector options={options} selectedId="1" onChange={() => { }} />);
        expect(screen.getByText('Small')).toBeInTheDocument();
        expect(screen.getByText('Large')).toBeInTheDocument();
        expect(screen.getByText('Petite')).toBeInTheDocument();
    });

    it('calls onChange when clicked', () => {
        const handleChange = vi.fn();
        renderComponent(<SizeSelector options={options} selectedId="1" onChange={handleChange} />);

        fireEvent.click(screen.getByText('Large'));
        expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('indicates selection', () => {
        renderComponent(<SizeSelector options={options} selectedId="2" onChange={() => { }} />);

        const radios = screen.getAllByRole('radio');
        expect(radios[1]).toHaveAttribute('aria-checked', 'true');
        expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    });
});
