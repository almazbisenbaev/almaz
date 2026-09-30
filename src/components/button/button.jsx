import Link from 'next/link';

import { cn } from '@/lib/utils';

/**
 * Renders as a `<button>`, an internal `<Link>`, or an external `<a>`,
 * depending on `href`. Variants are styled in `globals.css` as
 * `.button-<variant>`.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'black' | 'white' | 'outline-white'} [props.variant='secondary']
 * @param {string} [props.href] - Omit for a real button.
 * @param {boolean} [props.external] - Forces a new tab for hrefs that are not
 *   recognisably absolute, such as a link to a subdomain.
 * @param {string} [props.className] - Additional classes.
 */
const Button = ({ variant = 'secondary', href, external, children, className, ...rest }) => {
  const classes = cn('button', `button-${variant}`, className);

  if (!href) {
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const isExternal = external || href.startsWith('http') || href.startsWith('//');

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
};

export default Button;
