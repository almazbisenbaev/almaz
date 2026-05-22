import React from 'react';
import Link from 'next/link';
import './button.css';

/**
 * Button component with multiple variants.
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'black' | 'white' | 'outline-white'} [props.variant='secondary'] - The button style variant
 * @param {string} [props.href] - If provided, renders an <a> or <Link> tag
 * @param {boolean} [props.external] - If true and href is provided, adds target="_blank" and rel="noopener noreferrer"
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.rest] - Other standard button or anchor props
 */
const Button = ({ 
  variant = 'secondary', 
  href, 
  external, 
  children, 
  className = '', 
  ...rest 
}) => {
  const baseClass = 'button';
  const variantClass = `button-${variant}`;
  const combinedClasses = `${baseClass} ${variantClass} ${className}`.trim();

  if (href) {
    const isExternal = external || href.startsWith('http') || href.startsWith('//');
    
    if (isExternal) {
      return (
        <a 
          href={href} 
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
